import { Request, Response } from "express";

import { MessageResponse } from "../utils/enum";
import { CustomRequest } from "../utils/interface";
import { userService } from "../user/service";
import { AccountStatus } from "../user/enum";
import { cardService } from "./service";

class CardController {
  public async createCard(req: Request, res: Response) {
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

    const doesUserHaveCard = await cardService.findCardByUserId(
      userExist._id.toString()
    );
    
    if (doesUserHaveCard) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "You already have a card!",
        data: null,
      });
    }

    await cardService.createCard({
      userId: userExist._id.toString(),
      firstName: userExist.firstName,
      lastName: userExist.lastName,
    });


    return res.status(201).json({
      message: MessageResponse.Success,
      description: "Card created successfully!",
      data: null,
    });
  }

    public async fetchCard(req: Request, res: Response) {
    const { userId } = req as CustomRequest;

    const userExist = await userService.findUserByIdWithoutPassword(userId);

    if (!userExist) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: "User does not exist!",
        data: null,
      });   
    } 

     const doesUserHaveCard = await cardService.findCardByUserId(
      userExist._id.toString()
    );
    
    if (!doesUserHaveCard) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "You have not created a card!",
        data: null,
      });
    }

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Card fetched successfully!",
      data: doesUserHaveCard,
    });

}
}
export const cardController = new CardController();
