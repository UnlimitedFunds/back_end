import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { AccountOwnership, AccountType, MessageResponse } from "../utils/enum";
import { GenderStatus, MaritialStatus } from "../user/enum";

class UserValidator {
 
}

export const userValidator = new UserValidator();
