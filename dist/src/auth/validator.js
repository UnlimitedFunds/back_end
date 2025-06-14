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
const enum_2 = require("../user/enum");
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
                    .valid(enum_1.AccountType.Current, enum_1.AccountType.Savings, enum_1.AccountType.Checking, enum_1.AccountType.Domiciliary, enum_1.AccountType.Fixed, enum_1.AccountType.Joint, enum_1.AccountType.OnlineBanking, enum_1.AccountType.NonResident)
                    .required()
                    .messages({
                    "string.base": `Account type must be either "${enum_1.AccountType.Current}", "${enum_1.AccountType.OnlineBanking}", "${enum_1.AccountType.Savings}", "${enum_1.AccountType.Checking}, "${enum_1.AccountType.Domiciliary}", "${enum_1.AccountType.Fixed}", "${enum_1.AccountType.Joint}", or "${enum_1.AccountType.NonResident}".`,
                    "any.required": "Account type is required.",
                    "any.only": `Account type must be either "${enum_1.AccountType.Current}", "${enum_1.AccountType.OnlineBanking}", "${enum_1.AccountType.Savings}", "${enum_1.AccountType.Checking}, "${enum_1.AccountType.Domiciliary}", "${enum_1.AccountType.Fixed}", "${enum_1.AccountType.Joint}", or "${enum_1.AccountType.NonResident}".`,
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
                monthlyIncome: joi_1.default.string()
                    .pattern(/^\d+(\.\d+)?$/)
                    .required()
                    .messages({
                    "string.pattern.base": "Monthly must be a valid number.",
                    "any.required": "Monthly is required.",
                }),
                agreeToTerms: joi_1.default.boolean().valid(true).required().messages({
                    "any.required": `Agree to terms is requiredbut you sent ${joi_1.default.ref('agreeToTerms')}.`,
                    "any.only": `You must agree to the terms & conditions of use but you sent ${joi_1.default.ref('agreeToTerms')}.`,
                }),
                transferPin: joi_1.default.string()
                    .pattern(/^\d{4}$/) // Ensures exactly 4 digits
                    .required()
                    .messages({
                    "string.pattern.base": "Transfer pin must be a 4-digit number.",
                    "any.required": "Transfer pin is required.",
                }),
                confirmTransferPin: joi_1.default.string()
                    .valid(joi_1.default.ref("transferPin"))
                    .required()
                    .messages({
                    "any.required": "Confirm transfer pin is required.",
                    "any.only": "Transfer pins do not match",
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
            const profilePicture = req.files['profilePicture'][0];
            const proofOfAddress = req.files['proofOfAddress'][0];
            if (!['image/jpeg', 'image/png'].includes(profilePicture.mimetype)) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Profile picture must be a JPEG or PNG image",
                    data: null,
                });
            }
            if (!['image/jpeg', 'image/png'].includes(proofOfAddress.mimetype)) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Proof of address must be a JPEG or PNG image",
                    data: null,
                });
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
    validateEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                email: joi_1.default.string().email().required().messages({
                    "string.base": "Email must be text",
                    "strig.email": "Invalid email format",
                    "any.required": "Email is required.",
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
    forgotPasswordChange(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                email: joi_1.default.string().email().required().messages({
                    "string.base": "Email must be text",
                    "strig.email": "Invalid email format",
                    "any.required": "Email is required.",
                }),
                otp: joi_1.default.string().required().messages({
                    "any.required": "OTP is required.",
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
}
exports.authValidator = new AuthValidator();
