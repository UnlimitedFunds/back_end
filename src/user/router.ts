import { Router } from "express";

import { wrapAsync } from "../utils";
import { isAuth } from "../middleware/isAuth";
import { userController } from "./controller";
import multer from "multer";
import { userValidator } from "./validator";

const storage = multer.memoryStorage();


export const UserRouter = Router();

const upload = multer({ storage: storage }).fields([
  { name: "profilePicture", maxCount: 1 },
]);


//Get user information
UserRouter.get(
  "/user",
  [isAuth],
  wrapAsync(userController.fetchUserDetails)
);

//Get user information
UserRouter.patch(
  "/user/upload/profile-picture",
  [isAuth, upload, userValidator.profileImageUpload],
  wrapAsync(userController.editProfilePicture)
);



