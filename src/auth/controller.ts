import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { MessageResponse } from "../utils/enum";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { MulterFiles } from "./interface";
import { userService } from "../user/service";
import { IUserInput } from "../user/interface";
import { ISignIn } from "./enum";

dotenv.config();

//const tokenExpiry = process.env.TOKEN_EXPIRY || "30D";
const jwtSecret = process.env.JWT_SECRET || "";

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

  public async signIn(req: Request, res: Response) {
    const body:ISignIn = req.body;

    const password = body.password;

    const userExist = await userService.findUserByEmail(body.email);

    if (!userExist) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Wrong user credentials!",
        data: null,
      });
    }

    if (userExist.password !== password) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Wrong user credentials!",
        data: null,
      });
    }

    const token = jwt.sign(
      { userId: userExist._id },
      jwtSecret,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Logged in successfully",
      data: {
        token,
      },
    });
  }
}

export const authController = new AuthController();
