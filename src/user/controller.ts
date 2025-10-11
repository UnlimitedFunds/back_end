import { Request, Response } from "express";

import { userService } from "./service";
import { CustomRequest } from "../utils/interface";
import { IUserUpdate } from "./interface";
import { AccountStatus } from "./enum";
import { MulterFiles } from "../auth/interface";
import dotenv from "dotenv";
import { MessageResponse } from "../utils/enum";
import fs from "fs/promises";
import cloudinary from "../../config/cloudinary";
import { v4 as uuidv4 } from "uuid";

class UserController {

   public async editProfilePicture(req: Request, res: Response) {

    const files = req.files as MulterFiles;

  const { userId } = req as CustomRequest;

    const userExist = await userService.findUserByIdWithoutPassword(userId);

    if (!userExist) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: "User not found!",
        data: null,
      });
    }


    // Upload profile image
    const profileImageBuffer = files["profilePicture"][0].buffer;
    const profileImageTempFile = `${uuidv4()}.jpg`;
    await fs.writeFile(profileImageTempFile, profileImageBuffer);
    const profileImageUpload = await cloudinary.uploader.upload(
      profileImageTempFile
    );
    await fs.unlink(profileImageTempFile);


    await userService.updateUserProfilePicture(profileImageUpload.secure_url, userId);

    return res.status(201).json({
      message: MessageResponse.Success,
      description:
        "Profile image updated successfully!",
      data: null,
    });

  }

  public async fetchUserDetails(req: Request, res: Response) {
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

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "User details fetched successfully!",
      data: userExist,
    });
  }
}

export const userController = new UserController();
