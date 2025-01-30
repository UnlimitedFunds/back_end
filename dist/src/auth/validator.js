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
    signUp(req, res, next) {
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
                userName: joi_1.default.string().required().messages({
                    "string.base": "User name must be text",
                    "any.required": "User name is required.",
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
                password: joi_1.default.string()
                    .min(8)
                    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
                    .required()
                    .messages({
                    "any.required": "Password is required.",
                    "string.min": "Password must be at least 8 characters long",
                    "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                }),
                confirmPassword: joi_1.default.string()
                    .valid(joi_1.default.ref("password"))
                    .required()
                    .messages({
                    "any.required": "Confirm Password is required.",
                    "any.only": "Passwords do not match",
                }),
                accountType: joi_1.default.string()
                    .valid(enum_1.AccountType.Current, enum_1.AccountType.Savings)
                    .required()
                    .messages({
                    "string.base": `Account type must be either "${enum_1.AccountType.Current}" or "${enum_1.AccountType.Savings}"`,
                    "any.required": "Account type is required.",
                    "any.only": `Account type must be either "${enum_1.AccountType.Current}" or "${enum_1.AccountType.Savings}"`,
                }),
                accountOwnership: joi_1.default.string()
                    .valid(enum_1.AccountOwnership.Company, enum_1.AccountOwnership.Joint, enum_1.AccountOwnership.Personal, enum_1.AccountOwnership.Others)
                    .required()
                    .messages({
                    "string.base": `Account ownership must be one of: "${enum_1.AccountOwnership.Company}", "${enum_1.AccountOwnership.Joint}", "${enum_1.AccountOwnership.Personal}", or "${enum_1.AccountOwnership.Others}".`,
                    "any.required": "Account ownership is required.",
                    "any.only": `Account ownership must be one of: "${enum_1.AccountOwnership.Company}", "${enum_1.AccountOwnership.Joint}", "${enum_1.AccountOwnership.Personal}", or "${enum_1.AccountOwnership.Others}".`,
                }),
                initialDeposit: joi_1.default.string()
                    .pattern(/^\d+(\.\d+)?$/)
                    .required()
                    .messages({
                    "string.pattern.base": "Initial deposit must be a valid number.",
                    "any.required": "Initial deposit is required.",
                }),
                agreeToTerms: joi_1.default.boolean().valid(true).required().messages({
                    "any.required": "You must agree to the terms & conditions of use.",
                    "any.only": "You must agree to the terms & conditions of use.",
                }),
                transferPin: joi_1.default.string()
                    .pattern(/^\d{4}$/) // Ensures exactly 4 digits
                    .required()
                    .messages({
                    "string.pattern.base": "Transfer pin must be a 4-digit number.",
                    "any.required": "Transfer pin is required.",
                }),
                ssn: joi_1.default.string()
                    .pattern(/^\d{9}$/) // Ensures exactly 9 digits
                    .required()
                    .messages({
                    "string.pattern.base": "SSN must be a 9-digit number.",
                    "any.required": "SSN is required.",
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
            // Validate image files
            if (!req.files || !("proofOfAddress" in req.files)) {
                console.log(req.files);
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Proof of address is required",
                    data: null,
                });
            }
            if (!("profilePicture" in req.files)) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Profile picture is required",
                    data: null,
                });
            }
            const allowedMimeTypes = ["image/png", "image/jpg"];
            // Validate MIME type before uploading
            for (const key of ["proofOfAddress", "profilePicture"]) {
                const file = req.files[key][0];
                if (!allowedMimeTypes.includes(file.mimetype)) {
                    return res.status(400).json({
                        message: enum_1.MessageResponse.Error,
                        description: `${key} must be a valid image file (JPG, PNG)`,
                        data: null,
                    });
                }
            }
            return next();
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                email: joi_1.default.string().email().required().messages({
                    "string.email": "Please enter a valid email address",
                    "any.required": "Email address is required",
                }),
                password: joi_1.default.string().required().messages({
                    "any.required": "Password is required.",
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
