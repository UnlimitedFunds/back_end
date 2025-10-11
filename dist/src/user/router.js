"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const utils_1 = require("../utils");
const isAuth_1 = require("../middleware/isAuth");
const controller_1 = require("./controller");
const multer_1 = __importDefault(require("multer"));
const validator_1 = require("./validator");
const storage = multer_1.default.memoryStorage();
exports.UserRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: storage }).fields([
    { name: "profilePicture", maxCount: 1 },
]);
//Get user information
exports.UserRouter.get("/user", [isAuth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.userController.fetchUserDetails));
//Get user information
exports.UserRouter.patch("/user/upload/profile-picture", [isAuth_1.isAuth, upload, validator_1.userValidator.profileImageUpload], (0, utils_1.wrapAsync)(controller_1.userController.editProfilePicture));
