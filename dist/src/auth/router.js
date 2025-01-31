"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const validator_1 = require("./validator");
exports.AuthRouter = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage }).fields([
    { name: "proofOfAddress", maxCount: 1 },
    { name: "profilePicture", maxCount: 1 },
]);
//Create account
exports.AuthRouter.post("/signup", [upload,
    //authValidator.signUp 
], (0, utils_1.wrapAsync)(controller_1.authController.signUp));
//Login account
exports.AuthRouter.post("/signin", [validator_1.authValidator.signIn], (0, utils_1.wrapAsync)(controller_1.authController.signIn));
