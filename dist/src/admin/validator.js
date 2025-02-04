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
                })
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
            id: joi_1.default.string().custom((value, helpers) => {
                if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                    return helpers.message({
                        custom: "ID must be a valid ObjectId",
                    });
                }
                return value;
            }).required().messages({
                'string.base': 'ID must be a string',
                'any.required': 'ID is required',
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
}
exports.adminValidator = new AdminValidator();
