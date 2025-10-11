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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const enum_1 = require("../utils/enum");
class UserValidator {
    profileImageUpload(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate image files
            if (!req.files || !("profilePicture" in req.files)) {
                console.log(req.files);
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Profile picture is required",
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
            if (!['image/jpeg', 'image/png'].includes(profilePicture.mimetype)) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Profile picture must be a JPEG or PNG image",
                    data: null,
                });
            }
        });
    }
}
exports.userValidator = new UserValidator();
