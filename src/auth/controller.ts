import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { MessageResponse } from "../utils/enum";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { MulterFiles } from "./interface";
import { userService } from "../user/service";
import { IUserInput } from "../user/interface";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


class AuthController {
  public async signUp(req: Request, res: Response) {
    const body: IUserInput = req.body;
      // Type assertion for req.files
      const files = req.files as MulterFiles;

      const emailExists = await userService.findUserByEmail(body.email);

    if (emailExists) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Email already exist!",
        data: null,
      });
    }

      // Upload cover image
      const coverImageBuffer = files["proofOfAddress"][0].buffer;
      const coverImageTempFile = `${uuidv4()}.jpg`;
      await fs.writeFile(coverImageTempFile, coverImageBuffer);
      const coverImageUpload = await cloudinary.uploader.upload(coverImageTempFile);
      await fs.unlink(coverImageTempFile);

      // Upload profile image
      const profileImageBuffer = files["profilePicture"][0].buffer;
      const profileImageTempFile = `${uuidv4()}.jpg`;
      await fs.writeFile(profileImageTempFile, profileImageBuffer);
      const profileImageUpload = await cloudinary.uploader.upload(profileImageTempFile);
      await fs.unlink(profileImageTempFile);

      const newUser: IUserInput = {
        ...body,
        profilePicture: profileImageUpload.secure_url,
        proofOfAddress: coverImageUpload.secure_url,
      }

      await userService.createUser(newUser);

      return res.status(201).json({
        message: MessageResponse.Success,
        description: "Congratulations your account has been created, await approval!",
        data: null,
      });
  
  }
}

export const authController = new AuthController();
