import { Types } from "mongoose";

export interface IUserInput {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  userName: string;
  countryOfResidence: string;
  state: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  password: string;
  confirm_password: string;
  accountType: string;
  accountOwnership: string;
  initialDeposit: string;
  profilePicture: string;
  proofOfAddress: string;
  transferPin: string;
  ssn: string;
}

export interface IUser {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  userName: string;
  countryOfResidence: string;
  state: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  password: string;
  accountType: string;
  accountOwnership: string;
  initialDeposit: string;
  profilePicture: string;
  proofOfAddress: string;
  transferPin: string;
  ssn: string;
  accountApproved: boolean;
  updatedAt: Date;
  createdAt: Date;
}
