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
const dotenv_1 = __importDefault(require("dotenv"));
const enum_1 = require("../utils/enum");
const promises_1 = __importDefault(require("fs/promises"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const service_1 = require("../user/service");
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const enum_2 = require("../user/enum");
const global_1 = require("../utils/global");
const utils_1 = require("../utils");
const service_2 = require("./service");
const email_1 = require("../utils/email");
dotenv_1.default.config();
class AuthController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const files = req.files;
            const emailExists = yield service_1.userService.findUserByEmail(body.email);
            if (emailExists) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Email already exist!",
                    data: null,
                });
            }
            const userNameExists = yield service_1.userService.findUserByUserName(body.userName);
            if (userNameExists) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Username already exist!",
                    data: null,
                });
            }
            const snnExist = yield service_1.userService.findUserBySSN(body.ssn);
            if (snnExist) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "SSN already exist!",
                    data: null,
                });
            }
            // Upload cover image
            const coverImageBuffer = files["proofOfAddress"][0].buffer;
            const coverImageTempFile = `${(0, uuid_1.v4)()}.jpg`;
            yield promises_1.default.writeFile(coverImageTempFile, coverImageBuffer);
            const coverImageUpload = yield cloudinary_1.default.uploader.upload(coverImageTempFile);
            yield promises_1.default.unlink(coverImageTempFile);
            // Upload profile image
            const profileImageBuffer = files["profilePicture"][0].buffer;
            const profileImageTempFile = `${(0, uuid_1.v4)()}.jpg`;
            yield promises_1.default.writeFile(profileImageTempFile, profileImageBuffer);
            const profileImageUpload = yield cloudinary_1.default.uploader.upload(profileImageTempFile);
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
            if (userExist.status != enum_2.AccountStatus.Active) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Your account is not active!",
                    data: null,
                });
            }
            const token = jsonwebtoken_1.default.sign({ userId: userExist._id }, global_1.jwtSecret, {
                expiresIn: global_1.tokenExpiry,
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
    generateOtpForForgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const userExist = yield service_1.userService.findUserByEmail(email);
            if (userExist) {
                const otp = (0, utils_1.generateOtp)();
                const emailVerify = yield service_2.authService.saveOtp({ email, otp });
                if (!emailVerify) {
                    return res.status(404).json({
                        message: enum_1.MessageResponse.Error,
                        description: "User not found",
                        data: null,
                    });
                }
                (0, email_1.sendForgotPasswordEmail)({
                    email,
                    otp,
                });
                return res.status(201).json({
                    message: enum_1.MessageResponse.Success,
                    description: "An OTP has been sent to your email address",
                    data: null,
                });
            }
            return res.status(404).json({
                message: enum_1.MessageResponse.Error,
                description: "Email does not exists",
                data: null,
            });
        });
    }
    forgotPasswordChange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, otp, password } = req.body;
            const user = yield service_2.authService.validateOtp(email, otp);
            if (!user) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Invalid otp",
                    data: null,
                });
            }
            if (user.emailVerificationOtpExpiration !== undefined) {
                const currentDate = new Date();
                const expirationDate = new Date(user.emailVerificationOtpExpiration);
                if (expirationDate < currentDate) {
                    return res.status(400).json({
                        message: enum_1.MessageResponse.Error,
                        description: "Verification OTP expired",
                        data: null,
                    });
                }
                yield service_2.authService.deleteOtp(email);
                yield service_2.authService.changePassword(email, password);
                (0, email_1.sendForgotPasswordResetSuccessfullyEmail)({ email, fullName: `${user.firstName} ${user.lastName}` });
                return res.status(201).json({
                    message: enum_1.MessageResponse.Success,
                    description: "Password Changed Successfully!",
                    data: null,
                });
            }
            return res.status(400).json({
                message: enum_1.MessageResponse.Error,
                description: "Verification OTP expired",
                data: null,
            });
        });
    }
}
exports.authController = new AuthController();
