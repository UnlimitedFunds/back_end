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
exports.authController = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const enum_1 = require("../utils/enum");
const promises_1 = __importDefault(require("fs/promises"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const service_1 = require("../user/service");
dotenv_1.default.config();
//const tokenExpiry = process.env.TOKEN_EXPIRY || "30D";
const jwtSecret = process.env.JWT_SECRET || "";
class AuthController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            // Type assertion for req.files
            const files = req.files;
            const emailExists = yield service_1.userService.findUserByEmail(body.email);
            if (emailExists) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Email already exist!",
                    data: null,
                });
            }
            // Upload cover image
            const coverImageBuffer = files["proofOfAddress"][0].buffer;
            const coverImageTempFile = `${(0, uuid_1.v4)()}.jpg`;
            yield promises_1.default.writeFile(coverImageTempFile, coverImageBuffer);
            const coverImageUpload = yield cloudinary_1.v2.uploader.upload(coverImageTempFile);
            yield promises_1.default.unlink(coverImageTempFile);
            // Upload profile image
            const profileImageBuffer = files["profilePicture"][0].buffer;
            const profileImageTempFile = `${(0, uuid_1.v4)()}.jpg`;
            yield promises_1.default.writeFile(profileImageTempFile, profileImageBuffer);
            const profileImageUpload = yield cloudinary_1.v2.uploader.upload(profileImageTempFile);
            yield promises_1.default.unlink(profileImageTempFile);
            const newUser = Object.assign(Object.assign({}, body), { profilePicture: profileImageUpload.secure_url, proofOfAddress: coverImageUpload.secure_url });
            yield service_1.userService.createUser(newUser);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Congratulations your account has been created, await approval!",
                data: null,
            });
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const password = body.password;
            const userExist = yield service_1.userService.findUserByEmail(body.email);
            if (!userExist) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Wrong user credentials!",
                    data: null,
                });
            }
            if (userExist.password !== password) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Wrong user credentials!",
                    data: null,
                });
            }
            const token = jsonwebtoken_1.default.sign({ userId: userExist._id }, jwtSecret, {
                expiresIn: "1h",
            });
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Logged in successfully",
                data: {
                    token,
                },
            });
        });
    }
}
exports.authController = new AuthController();
