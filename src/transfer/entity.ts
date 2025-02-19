import mongoose, { Schema } from "mongoose";

import { AccountType } from "../utils/enum";
import { ITransfer } from "./interface";

const transferSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, require, ref: "User" },
  bankName: {
    type: String,
    required: true,
  },
  beneficiaryName: {
    type: String,
    required: true,
  },
  beneficiaryAccountNumber: {
    type: String,
    required: true,
  },
  beneficiaryCountry: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
    unique: true,
  },
  narration: {
    type: String,
    required: true,
  },
  swiftcode: {
    type: String,
    required: true,
  },
  routingNumber: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
    enum: Object.values(AccountType),
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transfer = mongoose.model<ITransfer>("Transfer", transferSchema);

export default Transfer;
