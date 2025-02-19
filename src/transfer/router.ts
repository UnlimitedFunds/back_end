import { Router } from "express";

import { wrapAsync } from "../utils";
import { isAuth } from "../middleware/isAuth";
import { transferController } from "./controller";
import { authValidator } from "./validator";

export const TransferRouter = Router();
   //a
//Create transfer
TransferRouter.post(
  "/user/transfer",
  [isAuth, authValidator.transfer],
  wrapAsync(transferController.createTransfer)
);

//Fetch user transfer history
TransferRouter.get(
  "/user/transfer",
  [isAuth],
  wrapAsync(transferController.fetchUserTransferHistory)
);
