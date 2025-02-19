"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferRouter = void 0;
const express_1 = require("express");
const utils_1 = require("../utils");
const isAuth_1 = require("../middleware/isAuth");
const controller_1 = require("./controller");
exports.TransferRouter = (0, express_1.Router)();
//Create transfer
exports.TransferRouter.post("/user/transfer", [isAuth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.transferController.createTransfer));
//Fetch user transfer history
exports.TransferRouter.get("/user/transfer", [isAuth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.transferController.fetchUserTransferHistory));
