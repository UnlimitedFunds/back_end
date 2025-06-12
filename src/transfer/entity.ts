import mongoose, { Schema } from "mongoose";

import { AccountType, TransactionType, TransferType } from "../utils/enum";
import { ITransfer } from "./interface";
import { required } from "joi";

const transferSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User", },
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
  //For Wire TF
  routingNumber: {
    type: String,
  },
  accountType: {
    type: String,
    required: true,
    enum: Object.values(AccountType),
  },
  transferType: {
    type: String,
    required: true,
    enum: Object.values(TransferType),
  },
  transactionType: {
    type: String,
    default: TransactionType.Debit,
    enum: Object.values(TransactionType),
  },
  //For Wire TF
  beneficiaryCountry: {
    type: String
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
