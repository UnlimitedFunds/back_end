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
  confirmPassword: string;
  accountType: string;
  accountOwnership: string;
  initialDeposit: string;
  profilePicture: string;
  proofOfAddress: string;
  transferPin: string;
  confirmTransferPin: string;
  ssn: string;
  agreeToTerms: boolean;
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
