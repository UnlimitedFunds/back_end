import mongoose from "mongoose";

import User from "./entity";
import { IUserInput, IUserUpdate } from "./interface";
import { generateAccNo } from "../utils";

class UserService {
  public async createUser(input: IUserInput) {
    let newUser = new User({
      ...input,
      accountNo: generateAccNo(),
    });

    newUser = await newUser.save();

    return newUser;
  }

  public async updateUser(input: IUserUpdate, _id: string) {
    const user = await User.findOneAndUpdate(
      { _id }, // Query to find the user by ID
      {
        ...input,
      }, // Update the values
      { new: true } // Return the updated document
    );

    return user;
  }

  public async findUserByEmail(email: string) {
    const user = await User.findOne({
      email,
    });

    return user;
  }

  public async clear() {
    const user = await User.deleteMany();

    return user;
  }

  public async findUserByUserName(userName: string) {
    const user = await User.findOne({
      userName,
    });

    return user;
  }

  public async findUserBySSN(ssn: string) {
    const user = await User.findOne({
      ssn,
    });

    return user;
  }

  public async findUserByUserNameAndPassword(
    userName: string,
    password: string
  ) {
    const user = await User.findOne({
      $or: [
        { userName }, // Check if userName matches the userName field
        { email: userName }, // Check if userName matches the email field
      ],
      password, // Also check if the password matches
    });

    return user;
  }

  public async findUserByUserNameWithoutPassword(userName: string) {
    const user = await User.findOne({
      userName,
    }).select("-password");

    return user;
  }

  public async findUserById(id: string) {
    const user = await User.findById(id);

    return user;
  }

  public async findUserByIdWithoutPassword(id: string) {
    const user = await User.findById(id).select(
      "-password -emailVerificationOtp -emailVerificationOtpExpiration"
    );

    return user;
  }

  public async changeUserPasswordWithOldPassword(
    newPassword: string,
    userId: string
  ) {
    let user = await User.findById(userId);

    if (user) {
      user.password = newPassword;
      user = await user.save();
    }

    return user;
  }

  public async findUserByPassword(password: string) {
    const user = await User.findOne({ password });

    return user;
  }

  public async getTotalUserCount(): Promise<number> {
    const totalUsers = await User.countDocuments();
    return totalUsers;
  }

  public async getAllUsers() {
    const users = await User.find().select("-password");

    return users;
  }

  public async debitUser(amount: number, userId: string) {
    const user = await User.findById(userId);

    if (user) {
      const accBal = parseFloat(user.initialDeposit);

      const result = (accBal - amount).toFixed(2);

      user.initialDeposit = result.toString();

      await user.save();
    }
    
    return;
  }
}

export const userService = new UserService();
