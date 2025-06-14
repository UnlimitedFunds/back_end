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
exports.adminValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../utils/enum");
const enum_2 = require("../user/enum");
class AdminValidator {
    adminLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                userName: joi_1.default.string().required().messages({
                    "string.base": "User name must be text",
                    "any.required": "User name is required.",
                }),
                password: joi_1.default.string().required().messages({
                    "string.base": "Password must be text",
                    "any.required": "Password is required.",
                }),
            });
            const { error } = schema.validate(req.body);
            if (!error) {
                return next();
            }
            else {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: error.details[0].message,
                    data: null,
                });
            }
        });
    }
    validateParams(req, res, next) {
        const schema = joi_1.default.object({
            id: joi_1.default.string()
                .custom((value, helpers) => {
                if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                    return helpers.message({
                        custom: "ID must be a valid ObjectId",
                    });
                }
                return value;
            })
                .required()
                .messages({
                "string.base": "ID must be a string",
                "any.required": "ID is required",
            }),
        });
        const { error } = schema.validate(req.params);
        if (!error) {
            return next();
        }
        else {
            return res.status(400).json({
                message: enum_1.MessageResponse.Error,
                description: error.details[0].message,
                data: null,
            });
        }
    }
    userUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                firstName: joi_1.default.string().required().messages({
                    "string.base": "First name must be text",
                    "any.required": "First name is required.",
                }),
                middleName: joi_1.default.string().required().messages({
                    "string.base": "Middle name must be text",
                    "any.required": "Middle name is required.",
                }),
                lastName: joi_1.default.string().required().messages({
                    "string.base": "Last name must be text",
                    "any.required": "Last name is required.",
                }),
                email: joi_1.default.string().email().required().messages({
                    "string.email": "Please enter a valid email address",
                    "any.required": "Email address is required",
                }),
                countryOfResidence: joi_1.default.string().required().messages({
                    "string.base": "Country of residence must be text",
                    "any.required": "Country of residence is required.",
                }),
                state: joi_1.default.string().required().messages({
                    "string.base": "State must be text",
                    "any.required": "State is required.",
                }),
                phoneNumber: joi_1.default.string()
                    .pattern(/^\+?[1-9]\d{1,14}$/)
                    .required()
                    .messages({
                    "string.pattern.base": "Please enter a valid international phone number.",
                    "any.required": "Phone number is required.",
                }),
                address: joi_1.default.string().required().messages({
                    "string.base": "Address must be text",
                    "any.required": "Address is required.",
                }),
                dateOfBirth: joi_1.default.string().required().messages({
                    "string.base": "Date of birth must be text",
                    "any.required": "Date of birth is required.",
                }),
                initialDeposit: joi_1.default.string()
                    .pattern(/^\d+(\.\d+)?$/)
                    .required()
                    .messages({
                    "string.pattern.base": "Initial deposit must be a valid number.",
                    "any.required": "Initial deposit is required.",
                }),
                accountType: joi_1.default.string()
                    .valid(enum_1.AccountType.Current, enum_1.AccountType.Savings)
                    .required()
                    .messages({
                    "string.base": `Account type must be either "${enum_1.AccountType.Current}" or "${enum_1.AccountType.Savings}"`,
                    "any.required": "Account type is required.",
                    "any.only": `Account type must be either "${enum_1.AccountType.Current}" or "${enum_1.AccountType.Savings}"`,
                }),
                ssn: joi_1.default.string()
                    .pattern(/^\d{9}$/) // Ensures exactly 9 digits
                    .required()
                    .messages({
                    "string.pattern.base": "SSN must be a 9-digit number.",
                    "any.required": "SSN is required.",
                }),
                occupation: joi_1.default.string().required().messages({
                    "string.base": "Occupation must be text",
                    "any.required": "Occupation is required.",
                }),
                gender: joi_1.default.string()
                    .valid(enum_2.GenderStatus.Male, enum_2.GenderStatus.Female)
                    .required()
                    .messages({
                    "string.base": `Gender must be either: "${enum_2.GenderStatus.Male}" or "${enum_2.GenderStatus.Female}".`,
                    "any.required": "Gender is required.",
                    "any.only": `Gender must be either: "${enum_2.GenderStatus.Male}" or "${enum_2.GenderStatus.Female}".`,
                }),
                status: joi_1.default.string()
                    .valid(enum_2.AccountStatus.Active, enum_2.AccountStatus.Hold)
                    .required()
                    .messages({
                    "string.base": `Status must be either: "${enum_2.AccountStatus.Active}" or "${enum_2.AccountStatus.Hold}".`,
                    "any.required": "Status is required.",
                    "any.only": `Status must be either: "${enum_2.AccountStatus.Active}" or "${enum_2.AccountStatus.Hold}".`,
                }),
                maritalStatus: joi_1.default.string()
                    .valid(enum_2.MaritialStatus.Divorce, enum_2.MaritialStatus.Married, enum_2.MaritialStatus.Single)
                    .required()
                    .messages({
                    "string.base": `Marital Status must be one of: "${enum_2.MaritialStatus.Divorce}", "${enum_2.MaritialStatus.Married}" or "${enum_2.MaritialStatus.Single}".`,
                    "any.required": "Marital Status is required.",
                    "any.only": `Marital Status must be one of: "${enum_2.MaritialStatus.Divorce}", "${enum_2.MaritialStatus.Married}" or "${enum_2.MaritialStatus.Single}".`,
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
    createTransferWithAdmin(req, res, next) {
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
                accountType: joi_1.default.string()
                    .valid(enum_1.AccountType.Current, enum_1.AccountType.Savings, enum_1.AccountType.Checking, enum_1.AccountType.Domiciliary, enum_1.AccountType.Fixed, enum_1.AccountType.Joint, enum_1.AccountType.NonResident, enum_1.AccountType.Checking, enum_1.AccountType.OnlineBanking)
                    .required()
                    .messages({
                    "string.base": `Account type must be either "${enum_1.AccountType.Current}", "${enum_1.AccountType.OnlineBanking}", "${enum_1.AccountType.Savings}", "${enum_1.AccountType.Checking}, "${enum_1.AccountType.Domiciliary}" "${enum_1.AccountType.Fixed}, "${enum_1.AccountType.Joint}", "${enum_1.AccountType.NonResident}" or "${enum_1.AccountType.Checking}"`,
                    "any.required": "Account type is required.",
                    "any.only": `Account type must be either "${enum_1.AccountType.Current}", "${enum_1.AccountType.OnlineBanking}", "${enum_1.AccountType.Savings}", "${enum_1.AccountType.Checking}, "${enum_1.AccountType.Domiciliary}", "${enum_1.AccountType.Fixed}, "${enum_1.AccountType.Joint}", "${enum_1.AccountType.NonResident}" or "${enum_1.AccountType.Checking}"`,
                }),
                transferType: joi_1.default.string()
                    .valid(enum_1.TransferType.Domestic, enum_1.TransferType.Wire)
                    .required()
                    .messages({
                    "string.base": `Transfer type must be either "${enum_1.TransferType.Domestic}" or "${enum_1.TransferType.Wire}"`,
                    "any.required": "Transfer type is required.",
                    "any.only": `Transfer type must be either "${enum_1.TransferType.Domestic}" or "${enum_1.TransferType.Wire}"`,
                }),
                routingNumber: joi_1.default.when("transferType", {
                    is: enum_1.TransferType.Wire,
                    then: joi_1.default.string()
                        .pattern(/^\d{9}$/)
                        .required()
                        .messages({
                        "string.pattern.base": "Routing number must be a 9 digit numeric value.",
                        "any.required": "Routing number is required for wire transfers.",
                    }),
                    otherwise: joi_1.default.forbidden(),
                }),
                swiftcode: joi_1.default.when("transferType", {
                    is: enum_1.TransferType.Wire,
                    then: joi_1.default.string()
                        .pattern(/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/)
                        .required()
                        .messages({
                        "string.pattern.base": "Swift code must be 8 or 11 characters (letters and numbers).",
                        "any.required": "Swift code is required.",
                    }),
                    otherwise: joi_1.default.forbidden(),
                }),
                beneficiaryCountry: joi_1.default.when("transferType", {
                    is: enum_1.TransferType.Wire,
                    then: joi_1.default.string().required().messages({
                        "string.base": "Country must be text",
                        "any.required": "Country is required for wire transfers.",
                    }),
                    otherwise: joi_1.default.forbidden(),
                }),
                userId: joi_1.default.string()
                    .custom((value, helpers) => {
                    if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                        return helpers.message({
                            custom: "Usuer ID must be a valid ObjectId",
                        });
                    }
                    return value;
                })
                    .required()
                    .messages({
                    "string.base": "Usuer ID must be a string",
                    "any.required": "Usuer ID is required",
                }),
                transactionType: joi_1.default.string()
                    .valid(enum_1.TransactionType.Debit, enum_1.TransactionType.Credit)
                    .required()
                    .messages({
                    "string.base": `Transaction type must be either "${enum_1.TransactionType.Debit}" or "${enum_1.TransactionType.Credit}"`,
                    "any.required": "Transaction type is required.",
                    "any.only": `Transaction type must be either "${enum_1.TransactionType.Debit}" or "${enum_1.TransactionType.Credit}"`,
                }),
                transferDate: joi_1.default.date().iso().messages({
                    "date.base": "Transfer date must be a valid date.",
                    "date.format": "Transfer date must be in ISO 8601 format (e.g., YYYY-MM-DDTHH:mm:ss.sssZ).",
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
exports.adminValidator = new AdminValidator();
