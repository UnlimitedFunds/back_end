"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const utils_1 = require("../utils");
const isAuth_1 = require("../middleware/isAuth");
const controller_1 = require("./controller");
exports.UserRouter = (0, express_1.Router)();
exports.UserRouter.get("/user", [isAuth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.userController.fetchUserDetails));
