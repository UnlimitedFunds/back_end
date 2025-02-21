import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { isSameDay, parseISO } from "date-fns";

import { MessageResponse, TransactionType } from "../utils/enum";
import { IAdminUserInput } from "./interface";
import { adminService } from "./service";
import { jwtSecret, tokenExpiry } from "../utils/global";
import {
  AccountApproved,
  CustomRequest,
  TransactionAlert,
} from "../utils/interface";
import { userService } from "../user/service";
import { IUserUpdate } from "../user/interface";
import { ITransfer, ITransferInput } from "../transfer/interface";
import { AccountStatus } from "../user/enum";
import { transferService } from "../transfer/service";
import {
  sendAccountApprovedEmailToUser,
  sendAccountDeactivatedEmailToUser,
  sendAccountSuspendedmailToUser,
  sendCreditAlert,
  sendDebitAlert,
} from "../utils/email";

dotenv.config();

class AdminController {
  public async adminSignUp(req: Request, res: Response) {
    const body: IAdminUserInput = req.body;

    await adminService.createAdmin(body);

    return res.status(201).json({
      message: MessageResponse.Success,
      description: "Admin created successfully!",
      data: null,
    });
  }

  public async adminSignIn(req: Request, res: Response) {
    const body: IAdminUserInput = req.body;

    const userName = body.userName;
    const password = body.password;

    const userExist = await adminService.findAdminByUserNameAndPassword({
      userName,
      password,
    });

    if (!userExist) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Wrong user credentials!",
        data: null,
      });
    }

    const token = jwt.sign({ userId: userExist._id }, jwtSecret, {
      expiresIn: tokenExpiry,
    });

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Logged in successfully",
      data: {
        token,
      },
    });
  }

  public async fetchUsers(req: Request, res: Response) {
    const users = await adminService.fetchAllUsers();

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Users fetched successfully!",
      data: users,
    });
  }

  public async fetchAllTransferHistory(req: Request, res: Response) {
    const transfers = await adminService.fetchAllTransfer();

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Transfer history fetched successfully!",
      data: transfers,
    });
  }

  public async approveUserAccount(req: Request, res: Response) {
    const { id } = req.params;

    const user = await userService.findUserById(id);

    if (!user) {
      return res.status(404).json({
        message: MessageResponse.Success,
        description: "User not found!",
        data: null,
      });
    }

    await adminService.approveUser(id);

    const acctApproved: AccountApproved = {
      receiverEmail: user.email,
      fullName: `${user.firstName} ${user.lastName}`,
    };

    sendAccountApprovedEmailToUser(acctApproved);

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "User has been approved!",
      data: null,
    });
  }

  public async deleteUserAccount(req: Request, res: Response) {
    const { id } = req.params;

    const user = await userService.findUserById(id);

    if (!user) {
      return res.status(404).json({
        message: MessageResponse.Success,
        description: "User not found!",
        data: null,
      });
    }

    await adminService.deleteUser(id);

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "User has been deleted!",
      data: null,
    });
  }

  public async deleteATransferHistory(req: Request, res: Response) {
    const { id } = req.params;

    const transfer = await transferService.findTransferById(id);

    if (!transfer) {
      return res.status(404).json({
        message: MessageResponse.Success,
        description: "Transfer not found!",
        data: null,
      });
    }

    await transferService.deleteTransfer(id);

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Transfer has been deleted!",
      data: null,
    });
  }

  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;

    const body: IUserUpdate = req.body;

    const userExist = await userService.findUserById(id);

    if (!userExist) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: "User does not exist!",
        data: null,
      });
    }

    const user = await userService.updateUser(body, id);

    if (userExist.status != user?.status) {
      const approvalStatus: AccountApproved = {
        receiverEmail: userExist.email,
        fullName: `${userExist.firstName} ${userExist.lastName}`,
      };
      if (user?.status == AccountStatus.Active) {
        sendAccountDeactivatedEmailToUser(approvalStatus);
      } else {
        sendAccountSuspendedmailToUser(approvalStatus);
      }
    }

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "User details updated successfully!",
      data: null,
    });
  }

  public async updateUserTransfer(req: Request, res: Response) {
    const { id } = req.params;

    const body: ITransferInput = req.body;

    const transfer = await transferService.findTransferById(id);

    if (!transfer) {
      return res.status(404).json({
        message: MessageResponse.Success,
        description: "Transfer not found!",
        data: null,
      });
    }

    await transferService.updateTransfer(body, id);

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Transfer details updated successfully!",
      data: null,
    });
  }

  public async createTransferWithAdmin(req: Request, res: Response) {
    const { userId } = req as CustomRequest;
    const body: ITransferInput = req.body;

    const userExist = await userService.findUserByIdWithoutPassword(
      body.userId
    );

    if (!userExist) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: "This user does not exist!",
        data: null,
      });
    }

    if (userExist.status != AccountStatus.Active) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "This user is not active!",
        data: null,
      });
    }

    const createdTransfer = await transferService.createTransfer(body);

    const transferAmount = parseFloat(body.amount);

    body.transferDate;

    const txAlert: TransactionAlert = {
      accountNumber: userExist.accountNo,
      amount: transferAmount,
      date: createdTransfer.createdAt,
      senderEmail: userExist.email,
      receiverFullName: body.beneficiaryName,
      senderFullName: `${userExist.firstName} ${userExist.lastName}`,
      transactionNumber: createdTransfer.transactionId,
      transactionDate: createdTransfer.createdAt,
    };

    const isTodayTransfer = (transferDate: string): boolean => {
      return isSameDay(parseISO(transferDate), new Date());
    };

    if (
      isTodayTransfer(createdTransfer.createdAt) &&
      body.transactionType == TransactionType.Debit
    ) {
      sendDebitAlert(txAlert);
    }

    if (
      isTodayTransfer(createdTransfer.createdAt) &&
      body.transactionType == TransactionType.Credit
    ) {
      sendCreditAlert(txAlert);
    }

    return res.status(201).json({
      message: MessageResponse.Success,
      description: "Transfer created successfully",
      data: null,
    });
  }
}

export const adminController = new AdminController();
