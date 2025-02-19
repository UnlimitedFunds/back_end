"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const enum_1 = require("../utils/enum");
class AuthValidator {
    transfer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                bankName: joi_1.default.string().required().messages({
                    "string.base": "Bank name must be text",
                    "any.required": "Bank name is required.",
                }),
                beneficiaryName: joi_1.default.string().required().messages({
                    "string.base": "Beneficiary name must be text",
                    "any.required": "Beneficiary name is required.",
                }),
                beneficiaryAccountNumber: joi_1.default.string().required().messages({
                    "string.base": "Beneficiary account number must be text",
                    "any.required": "Beneficiary account number is required.",
                }),
                beneficiaryCountry: joi_1.default.string().required().messages({
                    "string.base": "Beneficiary country must be text",
                    "any.required": "Beneficiary country is required.",
                }),
                amount: joi_1.default.alternatives()
                    .try(joi_1.default.number().positive(), joi_1.default.string().pattern(/^\d+(\.\d+)?$/))
                    .required()
                    .messages({
                    "alternatives.match": "Amount must be a valid number.",
                    "any.required": "Amount is required.",
                }),
                serviceFee: joi_1.default.alternatives()
                    .try(joi_1.default.number().positive(), joi_1.default.string().pattern(/^\d+(\.\d+)?$/))
                    .required()
                    .messages({
                    "alternatives.match": "Service fee must be a valid number.",
                    "any.required": "Service fee is required.",
                }),
                narration: joi_1.default.string().required().messages({
                    "string.base": "Narration must be text",
                    "any.required": "Narration is required.",
                }),
                swiftcode: joi_1.default.string()
                    .pattern(/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/)
                    .required()
                    .messages({
                    "string.pattern.base": "Swift code must be 8 or 11 characters (letters and numbers).",
                    "any.required": "Swift code is required.",
                }),
                routingNumber: joi_1.default.string()
                    .pattern(/^\d{9}$/)
                    .required()
                    .messages({
                    "string.pattern.base": "Routing number must be a 9 digit numeric value.",
                    "any.required": "Routing number is required.",
                }),
                accountType: joi_1.default.string()
                    .valid(enum_1.AccountType.Current, enum_1.AccountType.Savings)
                    .required()
                    .messages({
                    "string.base": `Account type must be either "${enum_1.AccountType.Current}" or "${enum_1.AccountType.Savings}"`,
                    "any.required": "Account type is required.",
                    "any.only": `Account type must be either "${enum_1.AccountType.Current}" or "${enum_1.AccountType.Savings}"`,
                }),
            });
            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: error.details[0].message,
                    data: null,
                });
            }
            return next();
        });
    }
}
exports.authValidator = new AuthValidator();
