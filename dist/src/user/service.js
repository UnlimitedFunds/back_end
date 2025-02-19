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
exports.userService = void 0;
const entity_1 = __importDefault(require("./entity"));
const utils_1 = require("../utils");
class UserService {
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let newUser = new entity_1.default(Object.assign(Object.assign({}, input), { accountNo: (0, utils_1.generateAccNo)() }));
            newUser = yield newUser.save();
            return newUser;
        });
    }
    updateUser(input, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOneAndUpdate({ _id }, Object.assign({}, input), // Update the values
            { new: true } // Return the updated document
            );
            return user;
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOne({
                email,
            });
            return user;
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.deleteMany();
            return user;
        });
    }
    findUserByUserName(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOne({
                userName,
            });
            return user;
        });
    }
    findUserBySSN(ssn) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOne({
                ssn,
            });
            return user;
        });
    }
    findUserByUserNameAndPassword(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOne({
                $or: [
                    { userName }, // Check if userName matches the userName field
                    { email: userName }, // Check if userName matches the email field
                ],
                password, // Also check if the password matches
            });
            return user;
        });
    }
    findUserByUserNameWithoutPassword(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOne({
                userName,
            }).select("-password");
            return user;
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findById(id);
            return user;
        });
    }
    findUserByIdWithoutPassword(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findById(id).select("-password -emailVerificationOtp -emailVerificationOtpExpiration");
            return user;
        });
    }
    changeUserPasswordWithOldPassword(newPassword, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield entity_1.default.findById(userId);
            if (user) {
                user.password = newPassword;
                user = yield user.save();
            }
            return user;
        });
    }
    findUserByPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOne({ password });
            return user;
        });
    }
    getTotalUserCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalUsers = yield entity_1.default.countDocuments();
            return totalUsers;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield entity_1.default.find().select("-password");
            return users;
        });
    }
    debitUser(amount, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findById(userId);
            if (user) {
                const accBal = parseFloat(user.initialDeposit);
                const result = (accBal - amount).toFixed(2);
                user.initialDeposit = result.toString();
                yield user.save();
            }
            return;
        });
    }
}
exports.userService = new UserService();
