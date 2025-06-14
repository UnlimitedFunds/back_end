import { Request, Response } from "express";

import { MessageResponse } from "../utils/enum";
import { CustomRequest, TransactionAlert } from "../utils/interface";
import { ITransfer, ITransferInput } from "./interface";
import { userService } from "../user/service";
import { transferService } from "./service";
import { AccountStatus } from "../user/enum";
import { sendDebitAlert } from "../utils/email";

class TransferController {
  public async createTransfer(req: Request, res: Response) {
    const { userId } = req as CustomRequest;
    const body: ITransferInput = req.body;

    const userExist = await userService.findUserByIdWithoutPassword(userId);

    if (!userExist) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: "User does not exist!",
        data: null,
      });
    }

    if (userExist.status != AccountStatus.Active) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Your account is not active!",
        data: null,
      });
    }

    if (body.transferPin != userExist.transferPin) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Incorrect transfer pin!",
        data: null,
      });
    }

    const userBalance = parseFloat(userExist.initialDeposit);

    const transferAmount = parseFloat(body.amount);

    // if (isNaN(userBalance) || isNaN(transferAmount)) {
    //   return res.status(400).json({
    //     message: MessageResponse.Error,
    //     description: "Invalid amount or balance!",
    //     data: null,
    //   });
    // }

    if (transferAmount > userBalance) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Insufficient balance!",
        data: null,
      });
    }

    await userService.debitUser(transferAmount, userExist._id.toString());

    const transfer: ITransferInput = {
      ...body,
      userId: userExist._id.toString(),
    };

    const createdTransfer = await transferService.createTransfer(transfer);

    const debitAlert: TransactionAlert = {
      accountNumber: userExist.accountNo,
      amount: transferAmount,
      date: createdTransfer.createdAt,
      senderEmail: userExist.email,
      receiverFullName: body.beneficiaryName,
      senderFullName: `${userExist.firstName} ${userExist.lastName}`,
      transactionNumber: createdTransfer.transactionId,
      transactionDate: createdTransfer.createdAt,
      paymentMethod: createdTransfer.transferType
    };

    sendDebitAlert(debitAlert);

    return res.status(201).json({
      message: MessageResponse.Success,
      description: "Transfer successful",
      data: null,
    });
  }

  public async fetchUserTransferHistory(req: Request, res: Response) {
    const { userId } = req as CustomRequest;

    const userExist = await userService.findUserByIdWithoutPassword(userId);

    if (!userExist) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: "User does not exist!",
        data: null,
      });
    }

    if (userExist.status != AccountStatus.Active) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Your account is not active!",
        data: null,
      });
    }

    const userTransferHistory = await transferService.fetchUserTransferByUserId(
      userExist._id.toString()
    );

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Transfer history fetched sucessfully!",
      data: userTransferHistory,
    });
  }
}

export const transferController = new TransferController();
