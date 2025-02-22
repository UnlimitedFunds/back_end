import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import { AccountType, MessageResponse, TransactionType } from "../utils/enum";
import { AccountStatus, GenderStatus, MaritialStatus } from "../user/enum";

class ContactUsValidator {
  public async contactUs(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      firstName: Joi.string().required().messages({
        "string.base": "First name must be text",
        "any.required": "First name is required.",
      }),
      lastName: Joi.string().required().messages({
        "string.base": "Last name must be text",
        "any.required": "Last name is required.",
      }),
      senderEmail: Joi.string().email().required().messages({
        "string.email": "Please enter a valid sender email address",
        "any.required": "Sender email address is required",
      }),
      message: Joi.string().required().messages({
        "string.base": "Message must be text",
        "any.required": "Message is required.",
      }),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: error.details[0].message,
        data: null,
      });
    }

    return next();
  }

}

export const contactUsValidator = new ContactUsValidator();
