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
exports.transferController = void 0;
const enum_1 = require("../utils/enum");
const service_1 = require("../user/service");
const service_2 = require("./service");
const enum_2 = require("../user/enum");
const email_1 = require("../utils/email");
class TransferController {
    createTransfer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const body = req.body;
            const userExist = yield service_1.userService.findUserByIdWithoutPassword(userId);
            if (!userExist) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist!",
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
            if (body.transferPin != userExist.transferPin) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Incorrect transfer pin!",
                    data: null,
                });
            }
            const userBalance = parseFloat(userExist.initialDeposit);
            const transferAmount = parseFloat(body.amount);
            // if (isNaN(userBalance) || isNaN(transferAmount)) {
            //   return res.status(400).json({
            //     message: MessageResponse.Error,
            //     description: "Invalid amount or balance!",
            //     data: null,
            //   });
            // }
            if (transferAmount > userBalance) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Insufficient balance!",
                    data: null,
                });
            }
            yield service_1.userService.debitUser(transferAmount, userExist._id.toString());
            const transfer = Object.assign(Object.assign({}, body), { userId: userExist._id.toString() });
            const createdTransfer = yield service_2.transferService.createTransfer(transfer);
            const debitAlert = {
                accountNumber: userExist.accountNo,
                amount: transferAmount,
                date: createdTransfer.createdAt,
                senderEmail: userExist.email,
                receiverFullName: body.beneficiaryName,
                senderFullName: `${userExist.firstName} ${userExist.lastName}`,
                transactionNumber: createdTransfer.transactionId,
                transactionDate: createdTransfer.createdAt,
                paymentMethod: createdTransfer.transferType
            };
            (0, email_1.sendDebitAlert)(debitAlert);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Transfer successful",
                data: null,
            });
        });
    }
    fetchUserTransferHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userExist = yield service_1.userService.findUserByIdWithoutPassword(userId);
            if (!userExist) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist!",
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
            const userTransferHistory = yield service_2.transferService.fetchUserTransferByUserId(userExist._id.toString());
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Transfer history fetched sucessfully!",
                data: userTransferHistory,
            });
        });
    }
}
exports.transferController = new TransferController();
