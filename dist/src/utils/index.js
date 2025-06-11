"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCardPin = exports.generateExpiryDate = exports.generateCVV = exports.generateCardNumber = exports.generateRoutingNumber = exports.generateSwiftCode = exports.maskNumber = exports.formatAmount = exports.formatDate = exports.generateTransactionId = exports.generateAccNo = exports.generateOtp = exports.wrapAsync = void 0;
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
const generateSwiftCode = () => {
    const getLetters = (length) => Array.from({ length }, () => String.fromCharCode(65 + crypto_1.default.randomInt(0, 26))).join('');
    const getAlphaNum = (length) => Array.from({ length }, () => crypto_1.default.randomInt(0, 36).toString(36).toUpperCase()).join('');
    const bankCode = getLetters(4); // 4 letters: bank identifier
    const countryCode = getLetters(2); // 2 letters: ISO country code
    const locationCode = getAlphaNum(2); // 2 alphanumeric: location code
    const branchCode = crypto_1.default.randomInt(0, 2) ? getAlphaNum(3) : ""; // 50% chance to add branch code
    return `${bankCode}${countryCode}${locationCode}${branchCode}`;
};
exports.generateSwiftCode = generateSwiftCode;
const generateRoutingNumber = () => {
    return Array.from({ length: 9 }, () => crypto_1.default.randomInt(0, 10)).join('');
};
exports.generateRoutingNumber = generateRoutingNumber;
const generateCardNumber = () => {
    return Array.from({ length: 16 }, () => crypto_1.default.randomInt(0, 10)).join('');
};
exports.generateCardNumber = generateCardNumber;
const generateCVV = () => {
    return crypto_1.default.randomInt(100, 1000).toString(); // 100 to 999
};
exports.generateCVV = generateCVV;
const generateExpiryDate = () => {
    const now = new Date();
    const futureYear = now.getFullYear() + 4;
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
    const year = futureYear.toString().slice(-2); // Get last 2 digits of year
    return `${month}/${year}`;
};
exports.generateExpiryDate = generateExpiryDate;
const generateCardPin = () => {
    return Array.from({ length: 4 }, () => crypto_1.default.randomInt(0, 10)).join('');
};
exports.generateCardPin = generateCardPin;
