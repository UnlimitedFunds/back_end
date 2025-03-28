import { Request, Response } from "express";
import dotenv from "dotenv";
import { MessageResponse } from "../utils/enum";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { MulterFiles } from "./interface";
import { userService } from "../user/service";
import { IUserInput } from "../user/interface";
import { ISignIn } from "./enum";
import cloudinary from "../../config/cloudinary";
import { AccountStatus } from "../user/enum";
import { jwtSecret, tokenExpiry } from "../utils/global";
import { generateOtp } from "../utils";
import { authService } from "./service";
import { sendForgotPasswordEmail, sendForgotPasswordResetSuccessfullyEmail } from "../utils/email";

dotenv.config();

class AuthController {
  public async signUp(req: Request, res: Response) {
    const body: IUserInput = req.body;

    const files = req.files as MulterFiles;

    const emailExists = await userService.findUserByEmail(body.email);

    if (emailExists) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Email already exist!",
        data: null,
      });
    }

    const userNameExists = await userService.findUserByUserName(body.userName);

    if (userNameExists) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Username already exist!",
        data: null,
      });
    }

    const snnExist = await userService.findUserBySSN(body.ssn);

    if (snnExist) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "SSN already exist!",
        data: null,
      });
    }

    // Upload cover image
    const coverImageBuffer = files["proofOfAddress"][0].buffer;
    const coverImageTempFile = `${uuidv4()}.jpg`;
    await fs.writeFile(coverImageTempFile, coverImageBuffer);
    const coverImageUpload = await cloudinary.uploader.upload(
      coverImageTempFile
    );
    await fs.unlink(coverImageTempFile);

    // Upload profile image
    const profileImageBuffer = files["profilePicture"][0].buffer;
    const profileImageTempFile = `${uuidv4()}.jpg`;
    await fs.writeFile(profileImageTempFile, profileImageBuffer);
    const profileImageUpload = await cloudinary.uploader.upload(
      profileImageTempFile
    );
    await fs.unlink(profileImageTempFile);

    const newUser: IUserInput = {
      ...body,
      profilePicture: profileImageUpload.secure_url,
      proofOfAddress: coverImageUpload.secure_url,
    };

    await userService.createUser(newUser);

    return res.status(201).json({
      message: MessageResponse.Success,
      description:
        "Congratulations your account has been created, await approval!",
      data: null,
    });
  }

  public async signIn(req: Request, res: Response) {
    const body: ISignIn = req.body;

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

    if (userExist.status != AccountStatus.Active) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Your account is not active!",
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

  public async generateOtpForForgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    const userExist = await userService.findUserByEmail(email);

    if (userExist) {
      const otp = generateOtp();

      const emailVerify = await authService.saveOtp({ email, otp });

      if (!emailVerify) {
        return res.status(404).json({
          message: MessageResponse.Error,
          description: "User not found",
          data: null,
        });
      }

      sendForgotPasswordEmail({
        email,
        otp,
      });

      return res.status(201).json({
        message: MessageResponse.Success,
        description: "An OTP has been sent to your email address",
        data: null,
      });
    }

    return res.status(404).json({
      message: MessageResponse.Error,
      description: "Email does not exists",
      data: null,
    });
  }

  public async forgotPasswordChange(req: Request, res: Response) {
    const { email, otp, password } = req.body;

    const user = await authService.validateOtp(email, otp);

    if (!user) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Invalid otp",
        data: null,
      });
    }

    if (user.emailVerificationOtpExpiration !== undefined) {
      const currentDate = new Date();

      const expirationDate = new Date(user.emailVerificationOtpExpiration);

      if (expirationDate < currentDate) {
        return res.status(400).json({
          message: MessageResponse.Error,
          description: "Verification OTP expired",
          data: null,
        });
      }

      await authService.deleteOtp(email);

      await authService.changePassword(email, password);

      sendForgotPasswordResetSuccessfullyEmail({email, fullName: `${user.firstName} ${user.lastName}`})

      return res.status(201).json({
        message: MessageResponse.Success,
        description: "Password Changed Successfully!",
        data: null,
      });
    }

    return res.status(400).json({
      message: MessageResponse.Error,
      description: "Verification OTP expired",
      data: null,
    });
  }
}

export const authController = new AuthController();
