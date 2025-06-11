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


export const generateSwiftCode = (): string => {
  const getLetters = (length: number): string =>
    Array.from({ length }, () => String.fromCharCode(65 + crypto.randomInt(0, 26))).join('');

  const getAlphaNum = (length: number): string =>
    Array.from({ length }, () =>
      crypto.randomInt(0, 36).toString(36).toUpperCase()
    ).join('');

  const bankCode = getLetters(4);       // 4 letters: bank identifier
  const countryCode = getLetters(2);    // 2 letters: ISO country code
  const locationCode = getAlphaNum(2);  // 2 alphanumeric: location code
  const branchCode = crypto.randomInt(0, 2) ? getAlphaNum(3) : ""; // 50% chance to add branch code

  return `${bankCode}${countryCode}${locationCode}${branchCode}`;
};

export const generateRoutingNumber = (): string => {
  return Array.from({ length: 9 }, () => crypto.randomInt(0, 10)).join('');
};

export const generateCardNumber = (): string => {
  return Array.from({ length: 16 }, () => crypto.randomInt(0, 10)).join('');
};

export const generateCVV = (): string => {
  return crypto.randomInt(100, 1000).toString(); // 100 to 999
};

export const generateExpiryDate = (): string => {
  const now = new Date();
  const futureYear = now.getFullYear() + 4;
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
  const year = futureYear.toString().slice(-2); // Get last 2 digits of year

  return `${month}/${year}`;
};

export const generateCardPin = (): string => {
  return Array.from({ length: 4 }, () => crypto.randomInt(0, 10)).join('');
};


