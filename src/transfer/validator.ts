import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { AccountOwnership, AccountType, MessageResponse } from "../utils/enum";
import { GenderStatus, MaritialStatus } from "../user/enum";

class AuthValidator {
  public async transfer(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      bankName: Joi.string().required().messages({
        "string.base": "Bank name must be text",
        "any.required": "Bank name is required.",
      }),
      beneficiaryName: Joi.string().required().messages({
        "string.base": "Beneficiary name must be text",
        "any.required": "Beneficiary name is required.",
      }),
      beneficiaryAccountNumber: Joi.string().required().messages({
        "string.base": "Beneficiary account number must be text",
        "any.required": "Beneficiary account number is required.",
      }),
      beneficiaryCountry: Joi.string().required().messages({
        "string.base": "Beneficiary country must be text",
        "any.required": "Beneficiary country is required.",
      }),
      amount: Joi.string()
        .pattern(/^\d+(\.\d+)?$/)
        .required()
        .messages({
          "string.pattern.base": "Amount must be a valid number.",
          "any.required": "Amount is required.",
        }),
      narration: Joi.string().required().messages({
        "string.base": "Narration must be text",
        "any.required": "Narration is required.",
      }),
      swiftcode: Joi.string()
        .pattern(/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/)
        .required()
        .messages({
          "string.pattern.base":
            "Swift code must be 8 or 11 characters (letters and numbers).",
          "any.required": "Swift code is required.",
        }),

      routingNumber: Joi.string()
        .pattern(/^\d{9}$/)
        .required()
        .messages({
          "string.pattern.base":
            "Routing number must be a 9 digit numeric value.",
          "any.required": "Routing number is required.",
        }),
      accountType: Joi.string()
        .valid(AccountType.Current, AccountType.Savings)
        .required()
        .messages({
          "string.base": `Account type must be either "${AccountType.Current}" or "${AccountType.Savings}"`,
          "any.required": "Account type is required.",
          "any.only": `Account type must be either "${AccountType.Current}" or "${AccountType.Savings}"`,
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

export const authValidator = new AuthValidator();
