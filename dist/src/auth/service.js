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
exports.authService = void 0;
const entity_1 = __importDefault(require("../user/entity"));
class AuthService {
    saveOtp(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { otp, email } = input;
            const user = yield entity_1.default.findOne({
                email: email,
            });
            user.emailVerificationOtp = otp;
            //3600000 is in milisecs and this is 1hr, so the token is valid for 1 hour
            user.emailVerificationOtpExpiration = new Date(Date.now() + 3600000);
            yield user.save();
            return user;
        });
    }
    deleteOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOne({ email });
            if (user) {
                user.emailVerificationOtp = undefined;
                user.emailVerificationOtpExpiration = undefined;
                yield user.save();
            }
            return user;
        });
    }
    changePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOne({ email });
            if (user) {
                user.password = password;
                yield user.save();
            }
            return user;
        });
    }
    validateOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp_validity = yield entity_1.default.findOne({
                email: email,
                emailVerificationOtp: otp,
            });
            return otp_validity;
        });
    }
}
exports.authService = new AuthService();
