"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = require("express");
const utils_1 = require("../utils");
const validator_1 = require("./validator");
const controller_1 = require("./controller");
const isAuth_1 = require("../middleware/isAuth");
exports.AdminRouter = (0, express_1.Router)();
//Sign in as admin
exports.AdminRouter.post("/admin/signin", [validator_1.adminValidator.adminLogin], (0, utils_1.wrapAsync)(controller_1.adminController.adminSignIn));
//Fetch Users
exports.AdminRouter.get("/admin/users", [isAuth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.adminController.fetchUsers));
//Approve user acc
exports.AdminRouter.patch("/admin/approve/user/:id", [isAuth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.adminController.approveUserAccount));
//Delete user acc
exports.AdminRouter.delete("/admin/delete/user/:id", [isAuth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.adminController.deleteUserAccount));
exports.AdminRouter.patch("/admin/update/user/:id", [isAuth_1.isAuth, validator_1.adminValidator.userUpdate], (0, utils_1.wrapAsync)(controller_1.adminController.updateUser));
//Create an admin
// AdminRouter.post(
//     "/admin/signup",
//     // [
//       // upload.none(),  // For FormData
//       // adminValidator.signUp],
//     wrapAsync(adminController.adminSignUp)
//   );
