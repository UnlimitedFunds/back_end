import mongoose from "mongoose";

export interface ITransferInput {
  userId: string;
  bankName: string;
  beneficiaryName: string;
  beneficiaryAccountNumber: string;
  beneficiaryCountry: string;
  amount: string;
  narration: string;
  swiftcode: string;
  routingNumber: string;
  accountType: string;
  serviceFee: string;
  transferPin?: string;
}

export interface ITransfer {
  userId: string;
  bankName: string;
  beneficiaryName: string;
  beneficiaryAccountNumber: string;
  beneficiaryCountry: string;
  amount: string;
  narration: string;
  swiftcode: string;
  routingNumber: string;
  accountType: string;
  updatedAt: string;
  createdAt: string;
  serviceFee: string;
}
