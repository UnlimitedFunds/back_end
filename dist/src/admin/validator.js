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
}
exports.adminValidator = new AdminValidator();
