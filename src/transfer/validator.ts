import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { AccountType, MessageResponse, TransferType } from "../utils/enum";

class TransferValidator {
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
      transferPin: Joi.string().required().messages({
        "any.required": "Transfer pin is required!",
      }),
      beneficiaryCountry: Joi.string().required().messages({
        "string.base": "Beneficiary country must be text",
        "any.required": "Beneficiary country is required.",
      }),
      amount: Joi.alternatives()
        .try(Joi.number().positive(), Joi.string().pattern(/^\d+(\.\d+)?$/))
        .required()
        .messages({
          "alternatives.match": "Amount must be a valid number.",
          "any.required": "Amount is required.",
        }),
      serviceFee: Joi.alternatives()
        .try(Joi.number().positive(), Joi.string().pattern(/^\d+(\.\d+)?$/))
        .required()
        .messages({
          "alternatives.match": "Service fee must be a valid number.",
          "any.required": "Service fee is required.",
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
      accountType: Joi.string()
        .valid(
          AccountType.Current,
          AccountType.Savings,
          AccountType.Checking,
          AccountType.Domiciliary,
          AccountType.Fixed,
          AccountType.Joint,
          AccountType.NonResident,
          AccountType.Checking,
          AccountType.OnlineBanking
        )
        .required()
        .messages({
          "string.base": `Account type must be either "${AccountType.Current}", "${AccountType.OnlineBanking}", "${AccountType.Savings}", "${AccountType.Checking}, "${AccountType.Domiciliary}" "${AccountType.Fixed}, "${AccountType.Joint}", "${AccountType.NonResident}" or "${AccountType.Checking}"`,
          "any.required": "Account type is required.",
          "any.only": `Account type must be either "${AccountType.Current}", "${AccountType.OnlineBanking}", "${AccountType.Savings}", "${AccountType.Checking}, "${AccountType.Domiciliary}", "${AccountType.Fixed}, "${AccountType.Joint}", "${AccountType.NonResident}" or "${AccountType.Checking}"`,
        }),

      transferType: Joi.string()
        .valid(TransferType.Domestic, TransferType.Wire)
        .required()
        .messages({
          "string.base": `Transfer type must be either "${TransferType.Domestic}" or "${TransferType.Wire}"`,
          "any.required": "Transfer type is required.",
          "any.only": `Transfer type must be either "${TransferType.Domestic}" or "${TransferType.Wire}"`,
        }),

      routingNumber: Joi.when("transferType", {
        is: TransferType.Wire,
        then: Joi.string()
          .pattern(/^\d{9}$/)
          .required()
          .messages({
            "string.pattern.base":
              "Routing number must be a 9 digit numeric value.",
            "any.required": "Routing number is required for wire transfers.",
          }),
        otherwise: Joi.forbidden(),
      }),

      country: Joi.when("transferType", {
        is: TransferType.Wire,
        then: Joi.string().required().messages({
          "string.base": "Country must be text",
          "any.required": "Country is required for wire transfers.",
        }),
        otherwise: Joi.forbidden(),
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

export const transferValidator = new TransferValidator();
