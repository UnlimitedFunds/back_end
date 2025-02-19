import { Router } from "express";

import { wrapAsync } from "../utils";
import { isAuth } from "../middleware/isAuth";
import { transferController } from "./controller";

export const TransferRouter = Router();
   //a
//Create transfer
TransferRouter.post(
  "/user/transfer",
  [isAuth],
  wrapAsync(transferController.createTransfer)
);

//Fetch user transfer history
TransferRouter.get(
  "/user/transfer",
  [isAuth],
  wrapAsync(transferController.fetchUserTransferHistory)
);
