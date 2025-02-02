import mongoose, { Schema } from "mongoose";

import { IUser } from "./interface";
import { AccountOwnership, AccountType } from "../utils/enum";
import { AccountStatus, GenderStatus, MaritialStatus } from "./enum";

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  countryOfResidence: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    //unique: true
  },
  address: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accountType: {
    type: String,
    required: true,
    enum: Object.values(AccountType),
  },
  accountOwnership: {
    type: String,
    required: true,
    enum: Object.values(AccountOwnership),
  },
  initialDeposit: {
    type: String,
    required: true
  },
  transferPin: {
    type: String, 
    required: true
  },
  ssn: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  },
  proofOfAddress: {
    type: String,
    required: true
  },
  accountApproved: {
    type: Boolean,
    default: false,
  },
  occupation: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: Object.values(GenderStatus),
  },
  maritalStatus: {
    type: String,
    required: true,
    enum: Object.values(MaritialStatus),
  },
  status: {
    type: String,
    default: AccountStatus.Hold,
    enum: Object.values(AccountStatus),
  },
  emailVerificationOtp: {
    type: String,
    default: undefined,
  },
  emailVerificationOtpExpiration: {
    type: Date,
    default: undefined
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;