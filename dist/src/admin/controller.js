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
exports.adminController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const date_fns_1 = require("date-fns");
const enum_1 = require("../utils/enum");
const service_1 = require("./service");
const global_1 = require("../utils/global");
const service_2 = require("../user/service");
const enum_2 = require("../user/enum");
const service_3 = require("../transfer/service");
const email_1 = require("../utils/email");
dotenv_1.default.config();
class AdminController {
    adminSignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            yield service_1.adminService.createAdmin(body);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Admin created successfully!",
                data: null,
            });
        });
    }
    adminSignIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const userName = body.userName;
            const password = body.password;
            const userExist = yield service_1.adminService.findAdminByUserNameAndPassword({
                userName,
                password,
            });
            if (!userExist) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Wrong user credentials!",
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
    fetchUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield service_1.adminService.fetchAllUsers();
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Users fetched successfully!",
                data: users,
            });
        });
    }
    fetchAllTransferHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transfers = yield service_1.adminService.fetchAllTransfer();
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Transfer history fetched successfully!",
                data: transfers,
            });
        });
    }
    approveUserAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield service_2.userService.findUserById(id);
            if (!user) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Success,
                    description: "User not found!",
                    data: null,
                });
            }
            yield service_1.adminService.approveUser(id);
            const acctApproved = {
                receiverEmail: user.email,
                fullName: `${user.firstName} ${user.lastName}`,
            };
            (0, email_1.sendAccountApprovedEmailToUser)(acctApproved);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "User has been approved!",
                data: null,
            });
        });
    }
    deleteUserAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield service_2.userService.findUserById(id);
            if (!user) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Success,
                    description: "User not found!",
                    data: null,
                });
            }
            yield service_1.adminService.deleteUser(id);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "User has been deleted!",
                data: null,
            });
        });
    }
    deleteATransferHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const transfer = yield service_3.transferService.findTransferById(id);
            if (!transfer) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Success,
                    description: "Transfer not found!",
                    data: null,
                });
            }
            yield service_3.transferService.deleteTransfer(id);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Transfer has been deleted!",
                data: null,
            });
        });
    }
    fetchTransferById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const transfer = yield service_3.transferService.findTransferById(id);
            if (!transfer) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Success,
                    description: "Transfer not found!",
                    data: null,
                });
            }
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Transfer fetched duccessfully!",
                data: transfer,
            });
        });
    }
    fetchTransferByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const transfer = yield service_3.transferService.fetchUserTransferByUserId(id);
            if (!transfer) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Success,
                    description: "Transfer not found!",
                    data: null,
                });
            }
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "User transfer fetched duccessfully!",
                data: transfer,
            });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const body = req.body;
            const userExist = yield service_2.userService.findUserById(id);
            if (!userExist) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist!",
                    data: null,
                });
            }
            const user = yield service_2.userService.updateUser(body, id);
            if (userExist.status != (user === null || user === void 0 ? void 0 : user.status)) {
                const approvalStatus = {
                    receiverEmail: userExist.email,
                    fullName: `${userExist.firstName} ${userExist.lastName}`,
                };
                if ((user === null || user === void 0 ? void 0 : user.status) == enum_2.AccountStatus.Active) {
                    (0, email_1.sendAccountActivatedEmailToUser)(approvalStatus);
                }
                else {
                    (0, email_1.sendAccountSuspendedmailToUser)(approvalStatus);
                }
            }
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "User details updated successfully!",
                data: null,
            });
        });
    }
    updateUserTransfer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const body = req.body;
            const transfer = yield service_3.transferService.findTransferById(id);
            if (!transfer) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Success,
                    description: "Transfer not found!",
                    data: null,
                });
            }
            yield service_3.transferService.updateTransfer(body, id);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Transfer details updated successfully!",
                data: null,
            });
        });
    }
    createTransferWithAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const body = req.body;
            const userExist = yield service_2.userService.findUserByIdWithoutPassword(body.userId);
            if (!userExist) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "This user does not exist!",
                    data: null,
                });
            }
            if (userExist.status != enum_2.AccountStatus.Active) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "This user is not active!",
                    data: null,
                });
            }
            const isTodayTransfer = (dateString) => {
                const date = (0, date_fns_1.parseISO)(dateString); // Convert to Date object
                return (0, date_fns_1.isSameDay)(date, new Date()); // Compare with today's date
            };
            console.log(`isTodayTransfer(body.transferDate.toString()) ==> ${isTodayTransfer(body.transferDate.toString())}`);
            if (isTodayTransfer(body.transferDate.toString()) && body.transactionType == enum_1.TransactionType.Debit) {
                const userBalance = parseFloat(userExist.initialDeposit);
                const transferAmount = parseFloat(body.amount);
                if (transferAmount > userBalance) {
                    return res.status(400).json({
                        message: enum_1.MessageResponse.Error,
                        description: "Insufficient balance!",
                        data: null,
                    });
                }
            }
            const createdTransfer = yield service_3.transferService.createTransfer(body);
            const transferAmount = parseFloat(body.amount);
            const txAlert = {
                accountNumber: userExist.accountNo,
                amount: transferAmount,
                date: createdTransfer.createdAt,
                senderEmail: userExist.email,
                receiverFullName: body.beneficiaryName,
                senderFullName: `${userExist.firstName} ${userExist.lastName}`,
                transactionNumber: createdTransfer.transactionId,
                transactionDate: createdTransfer.createdAt.toString(),
            };
            console.log(`transferDate ${body.transferDate.toString()} created At date ${createdTransfer.createdAt.toString()}`);
            if (isTodayTransfer(body.transferDate.toString())) {
                const userBalance = parseFloat(userExist.initialDeposit);
                const transferAmount = parseFloat(body.amount);
                if (transferAmount > userBalance) {
                    return res.status(400).json({
                        message: enum_1.MessageResponse.Error,
                        description: "Insufficient balance!",
                        data: null,
                    });
                }
                if (body.transactionType == enum_1.TransactionType.Debit) {
                    yield service_2.userService.debitUser(transferAmount, userExist._id);
                    (0, email_1.sendDebitAlert)(txAlert);
                }
                if (body.transactionType == enum_1.TransactionType.Credit) {
                    yield service_2.userService.creditUser(transferAmount, userExist._id);
                    (0, email_1.sendCreditAlert)(txAlert);
                }
            }
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Transfer created successfully",
                data: null,
            });
        });
    }
}
exports.adminController = new AdminController();
