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
exports.adminService = void 0;
const entity_1 = __importDefault(require("./entity"));
const entity_2 = __importDefault(require("../user/entity"));
const enum_1 = require("../user/enum");
const entity_3 = __importDefault(require("../transfer/entity"));
class AdminService {
    createAdmin(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, userName } = input;
            const admin = new entity_1.default({
                password,
                userName,
            });
            const adminData = yield admin.save();
            return adminData;
        });
    }
    findAdminByUserNameAndPassword(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, userName } = input;
            const admin = yield entity_1.default.findOne({ userName, password }).select("-password");
            return admin;
        });
    }
    fetchAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = entity_2.default.find().select("-password");
            return users;
        });
    }
    fetchAllTransfer() {
        return __awaiter(this, void 0, void 0, function* () {
            const transfers = entity_3.default.find();
            return transfers;
        });
    }
    approveUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_2.default.findOneAndUpdate({ _id: userId }, { $set: { status: enum_1.AccountStatus.Active } }, { new: true } // Return the updated document
            );
            return user;
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_2.default.findOneAndDelete({ _id: userId });
            return user;
        });
    }
}
exports.adminService = new AdminService();
