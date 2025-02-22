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
exports.contactUsValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const enum_1 = require("../utils/enum");
class ContactUsValidator {
    contactUs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                firstName: joi_1.default.string().required().messages({
                    "string.base": "First name must be text",
                    "any.required": "First name is required.",
                }),
                lastName: joi_1.default.string().required().messages({
                    "string.base": "Last name must be text",
                    "any.required": "Last name is required.",
                }),
                senderEmail: joi_1.default.string().email().required().messages({
                    "string.email": "Please enter a valid sender email address",
                    "any.required": "Sender email address is required",
                }),
                message: joi_1.default.string().required().messages({
                    "string.base": "Message must be text",
                    "any.required": "Message is required.",
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
exports.contactUsValidator = new ContactUsValidator();
