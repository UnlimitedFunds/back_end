"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRouter = void 0;
const express_1 = require("express");
const utils_1 = require("../utils");
const isAuth_1 = require("../middleware/isAuth");
const controller_1 = require("./controller");
exports.CardRouter = (0, express_1.Router)();
//a
//Create transfer
exports.CardRouter.post("/user/card", [isAuth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.cardController.createCard));
exports.CardRouter.get("/user/card", [isAuth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.cardController.fetchCard));
