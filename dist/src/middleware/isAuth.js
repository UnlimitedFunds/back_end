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
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enum_1 = require("../utils/enum");
const global_1 = require("../utils/global");
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({
            message: enum_1.MessageResponse.Error,
            description: "Not authenticated",
            data: null,
        });
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, global_1.jwtSecret);
    }
    catch (err) {
        return res.status(401).json({
            message: enum_1.MessageResponse.Error,
            description: "Not authenticated",
            data: null,
        });
    }
    if (!decodedToken) {
        return res.status(401).json({
            message: enum_1.MessageResponse.Error,
            description: "Not authenticated",
            data: null,
        });
    }
    req.userId = decodedToken.userId;
    next();
});
exports.isAuth = isAuth;
