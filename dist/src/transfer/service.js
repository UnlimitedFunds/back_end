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
exports.transferService = void 0;
const entity_1 = __importDefault(require("./entity"));
const utils_1 = require("../utils");
class TransferService {
    createTransfer(input, createdAt) {
        return __awaiter(this, void 0, void 0, function* () {
            let newTransfer = new entity_1.default(Object.assign(Object.assign({}, input), { createdAt, amount: input.amount.toString(), serviceFee: input.serviceFee.toString(), transactionId: (0, utils_1.generateTransactionId)() }));
            newTransfer = yield newTransfer.save();
            return newTransfer;
        });
    }
    fetchUserTransferByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const transfer = entity_1.default.find({ userId: id });
            return transfer;
        });
    }
    findTransferById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findById(id);
            return user;
        });
    }
    deleteTransfer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOneAndDelete({ _id: id });
            return user;
        });
    }
    updateTransfer(input, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOneAndUpdate({ _id }, Object.assign(Object.assign({}, input), { createdAt: input.transferDate }), // Update the values
            { new: true } // Return the updated document
            );
            return user;
        });
    }
}
exports.transferService = new TransferService();
