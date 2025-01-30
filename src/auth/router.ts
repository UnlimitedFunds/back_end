import { Router } from "express";
import multer from "multer";

import { authController } from "./controller";
import { wrapAsync } from "../utils";
import { authValidator } from "./validator";

export const AuthRouter = Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).fields([
  { name: "proofOfAddress", maxCount: 1 },
  { name: "profilePicture", maxCount: 1 },
]);

//Create account
AuthRouter.post(
  "/signup",
  [upload, authValidator.signUp ],
  wrapAsync(authController.signUp)
);

//Login account
AuthRouter.post(
  "/signin",
  [authValidator.signIn],
  wrapAsync(authController.signIn)
);