import { Request, Response } from "express";

import { MessageResponse } from "../utils/enum";
import { CustomRequest } from "../utils/interface";
import { ITransfer, ITransferInput } from "./interface";
import { userService } from "../user/service";
import { transferService } from "./service";
import { AccountStatus } from "../user/enum";

class TransferController {
  public async createTransfer(req: Request, res: Response) {
    const { userId } = req as CustomRequest;
    const body: ITransfer = req.body;

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

    await userService.debitUser(transferAmount, userExist._id.toString())

    const transfer: ITransferInput = {
      ...body,
      userId: userExist._id.toString(),
    };

    await transferService.createTransfer(transfer);

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

    const userTransferHistory = await transferService.fetchUserTransferById(userExist._id.toString());

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Transfer history fetched sucessfully!",
      data: userTransferHistory,
    });
  }
}

export const transferController = new TransferController();
