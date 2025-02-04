import { Router } from "express";

import { wrapAsync } from "../utils";
import { isAuth } from "../middleware/isAuth";
import { userController } from "./controller";


export const UserRouter = Router();

//Get user information
UserRouter.get(
  "/user",
  [isAuth],
  wrapAsync(userController.fetchUserDetails)
);



