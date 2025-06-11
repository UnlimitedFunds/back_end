import { Router } from "express";

import { wrapAsync } from "../utils";
import { isAuth } from "../middleware/isAuth";
import { cardController } from "./controller";

export const CardRouter = Router();
   //a
//Create transfer
CardRouter.post(
  "/user/create/card",
  [isAuth],
  wrapAsync(cardController.createCard)
);
