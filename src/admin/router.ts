import { Router } from "express";

import { wrapAsync } from "../utils";
import { adminValidator } from "./validator";
import { adminController } from "./controller";
import { isAuth } from "../middleware/isAuth";
import { transferValidator } from "../transfer/validator";

export const AdminRouter = Router();

//Sign in as admin
AdminRouter.post(
  "/admin/signin",
  [adminValidator.adminLogin],
  wrapAsync(adminController.adminSignIn)
);

//Fetch Users
AdminRouter.get(
  "/admin/users",
  [isAuth],
  wrapAsync(adminController.fetchUsers)
);

//Approve user acc
AdminRouter.patch(
  "/admin/approve/user/:id",
  [isAuth, adminValidator.validateParams],
  wrapAsync(adminController.approveUserAccount)
);

//Delete user acc
AdminRouter.delete(
  "/admin/delete/user/:id",
  [isAuth, adminValidator.validateParams],
  wrapAsync(adminController.deleteUserAccount)
);


AdminRouter.patch(
  "/admin/update/user/:id",
  [isAuth, adminValidator.validateParams, adminValidator.userUpdate],
  wrapAsync(adminController.updateUser)
);

//create transfer with admin
AdminRouter.post(
  "/admin/create/transfer",
  [adminValidator.createTransferWithAdmin],
  wrapAsync(adminController.createTransferWithAdmin)
);


//Fetch Transfer history
AdminRouter.get(
  "/admin/transfers",
  [isAuth],
  wrapAsync(adminController.fetchAllTransferHistory)
);

//Fetch Transfer for transction id
AdminRouter.get(
  "/admin/transfer/:id",
  [isAuth, adminValidator.validateParams],
  wrapAsync(adminController.fetchTransferById)
);

//Fetch Transfer for transction userid
AdminRouter.get(
  "/admin/transfer/user/:id",
  [isAuth, adminValidator.validateParams],
  wrapAsync(adminController.fetchTransferByUserId)
);

//Delete transfer history
AdminRouter.delete(
  "/admin/delete/transfer/:id",
  [isAuth, adminValidator.validateParams],
  wrapAsync(adminController.deleteATransferHistory)
);

//Update transfer details
AdminRouter.patch(
  "/admin/update/transfer/:id",
  [isAuth, adminValidator.validateParams, adminValidator.createTransferWithAdmin],
  wrapAsync(adminController.updateUserTransfer)
);

//Create an admin
// AdminRouter.post(
//     "/admin/signup",
//     // [
//       // upload.none(),  // For FormData
//       // adminValidator.signUp],
//     wrapAsync(adminController.adminSignUp)
//   );
