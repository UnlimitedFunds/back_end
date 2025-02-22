"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskNumber = exports.formatAmount = exports.formatDate = exports.generateTransactionId = exports.generateAccNo = exports.generateOtp = exports.wrapAsync = void 0;
const crypto_1 = __importDefault(require("crypto"));
// Middleware function to wrap controllers with try-catch
const wrapAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
exports.wrapAsync = wrapAsync;
const generateOtp = () => {
    return Array.from({ length: 4 }, () => crypto_1.default.randomInt(0, 10)).join('');
};
exports.generateOtp = generateOtp;
const generateAccNo = () => {
    return Array.from({ length: 10 }, () => crypto_1.default.randomInt(0, 10)).join('');
};
exports.generateAccNo = generateAccNo;
// Generate Transaction ID
const generateTransactionId = () => {
    const prefix = "TXN";
    const randomPart = crypto_1.default.randomBytes(4).toString("hex").toUpperCase();
    const timestamp = Date.now().toString().slice(-8);
    return `${prefix}${timestamp}${randomPart}`;
};
exports.generateTransactionId = generateTransactionId;
const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("en-GB").format(date);
};
exports.formatDate = formatDate;
const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};
exports.formatAmount = formatAmount;
const maskNumber = (number) => {
    return number.slice(0, -4).replace(/\d/g, "x") + number.slice(-4);
};
exports.maskNumber = maskNumber;
