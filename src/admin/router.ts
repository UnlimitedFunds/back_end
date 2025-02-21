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
  [isAuth],
  wrapAsync(adminController.approveUserAccount)
);

//Delete user acc
AdminRouter.delete(
  "/admin/delete/user/:id",
  [isAuth],
  wrapAsync(adminController.deleteUserAccount)
);


AdminRouter.patch(
  "/admin/update/user/:id",
  [isAuth, adminValidator.userUpdate],
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

//Delete transfer history
AdminRouter.delete(
  "/admin/delete/transfer/:id",
  [isAuth],
  wrapAsync(adminController.deleteATransferHistory)
);

//Update transfer details
AdminRouter.patch(
  "/admin/update/transfer/:id",
  [isAuth, transferValidator.transfer],
  wrapAsync(adminController.updateUser)
);

//Create an admin
// AdminRouter.post(
//     "/admin/signup",
//     // [
//       // upload.none(),  // For FormData
//       // adminValidator.signUp],
//     wrapAsync(adminController.adminSignUp)
//   );
