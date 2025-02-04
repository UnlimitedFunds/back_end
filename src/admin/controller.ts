import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { MessageResponse } from "../utils/enum";
import { IAdminUserInput } from "./interface";
import { adminService } from "./service";
import { jwtSecret, tokenExpiry } from "../utils/global";
import { CustomRequest } from "../utils/interface";
import { userService } from "../user/service";
import { IUserUpdate } from "../user/interface";

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

    const userExist = await adminService.findAdminByUserNameAndPassword({userName, password});

    if (!userExist) {
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
        expiresIn: tokenExpiry,
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

  public async fetchUsers(req: Request, res: Response) {
    const users = await adminService.fetchAllUsers();


    return res.status(200).json({
        message: MessageResponse.Success,
        description: "Users fetched successfully!",
        data: users,
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

  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;

    const body: IUserUpdate = req.body;

    const { userId } = req as CustomRequest;

    const userExist = await userService.findUserByIdWithoutPassword(userId);

    if (!userExist) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: "User does not exist!",
        data: null,
      });
    }

    const user = await userService.updateUser(body, id);

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "User details updated successfully!",
      data: user,
    });
  }
}

export const adminController = new AdminController();