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
exports.userController = void 0;
const service_1 = require("./service");
const enum_1 = require("./enum");
const enum_2 = require("../utils/enum");
const promises_1 = __importDefault(require("fs/promises"));
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const uuid_1 = require("uuid");
class UserController {
    editProfilePicture(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const files = req.files;
            ///const { userId } = req as CustomRequest;
            const userId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userId;
            const userExist = yield service_1.userService.findUserByIdWithoutPassword(userId);
            if (!userExist) {
                return res.status(404).json({
                    message: enum_2.MessageResponse.Error,
                    description: "User not found!",
                    data: null,
                });
            }
            // Upload profile image
            const profileImageBuffer = files["profilePicture"][0].buffer;
            const profileImageTempFile = `${(0, uuid_1.v4)()}.jpg`;
            yield promises_1.default.writeFile(profileImageTempFile, profileImageBuffer);
            const profileImageUpload = yield cloudinary_1.default.uploader.upload(profileImageTempFile);
            yield promises_1.default.unlink(profileImageTempFile);
            yield service_1.userService.updateUserProfilePicture(profileImageUpload.secure_url, userId);
            return res.status(201).json({
                message: enum_2.MessageResponse.Success,
                description: "Profile image updated successfully!",
                data: null,
            });
        });
    }
    fetchUserDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userExist = yield service_1.userService.findUserByIdWithoutPassword(userId);
            if (!userExist) {
                return res.status(404).json({
                    message: enum_2.MessageResponse.Error,
                    description: "User does not exist!",
                    data: null,
                });
            }
            if (userExist.status != enum_1.AccountStatus.Active) {
                return res.status(400).json({
                    message: enum_2.MessageResponse.Error,
                    description: "Your account is not active!",
                    data: null,
                });
            }
            return res.status(200).json({
                message: enum_2.MessageResponse.Success,
                description: "User details fetched successfully!",
                data: userExist,
            });
        });
    }
}
exports.userController = new UserController();
