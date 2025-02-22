import mongoose, { Schema } from "mongoose";

import { AccountType, TransactionType } from "../utils/enum";
import { ITransfer } from "./interface";
import { required } from "joi";

const transferSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, require, ref: "User", },
  transactionId: {
    type: String,
    required: true,
  },
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
  },
  narration: {
    type: String,
    required: true,
  },
  swiftcode: {
    type: String,
    required: true,
  },
  serviceFee: {
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
  transactionType: {
    type: String,
    default: TransactionType.Debit,
    enum: Object.values(TransactionType),
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
