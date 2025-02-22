import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

// Middleware function to wrap controllers with try-catch
export const wrapAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export const generateOtp = (): string  => {
  return Array.from({ length: 4 }, () => crypto.randomInt(0, 10)).join('');
}

export const generateAccNo= (): string => {
  return Array.from({ length: 10 }, () => crypto.randomInt(0, 10)).join('');
};

// Generate Transaction ID
export const generateTransactionId = (): string => {
  const prefix = "TXN";  
  const randomPart = crypto.randomBytes(4).toString("hex").toUpperCase(); 
  const timestamp = Date.now().toString().slice(-8); 

  return `${prefix}${timestamp}${randomPart}`;
};

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-GB").format(date);
};


export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const maskNumber = (number: string): string => {
  return number.slice(0, -4).replace(/\d/g, "x") + number.slice(-4);
};
