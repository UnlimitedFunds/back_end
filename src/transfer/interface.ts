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
  transactionType?: string;
  transferPin?: string;
  transferDate: Date;
  transactionId: string;
  transferType?: string;
  country?: string
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
  routingNumber?: string;
  accountType: string;
  updatedAt: string;
  createdAt: string;
  serviceFee: string;
  transactionType: string;
  transactionId: string;
  transferType: string;
  country?: string
}


export interface IOTP {
  email: string;
  otp: string;
}