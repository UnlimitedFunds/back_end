import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import { AccountType, MessageResponse } from "../utils/enum";
import { AccountStatus, GenderStatus, MaritialStatus } from "../user/enum";

class AdminValidator {
  public async adminLogin(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
     userName: Joi.string().required().messages({
        "string.base": "User name must be text",
        "any.required": "User name is required.",
      }),
     password: Joi.string().required().messages({
        "string.base": "Password must be text",
        "any.required": "Password is required.",
      })
    });
    const { error } = schema.validate(req.body);

    if (!error) {
      return next();
    } else {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: error.details[0].message,
        data: null,
      });
    }
  }

  public validateParams(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      id: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message({
            custom: "ID must be a valid ObjectId",
          });
        }
        return value;
      }).required().messages({
        'string.base': 'ID must be a string',
        'any.required': 'ID is required',
      }),
    });

    const { error } = schema.validate(req.params);

    if (!error) {
      return next();
    } else {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: error.details[0].message,
        data: null,
      });
    }
  }

  public async userUpdate(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      firstName: Joi.string().required().messages({
        "string.base": "First name must be text",
        "any.required": "First name is required.",
      }),
      middleName: Joi.string().required().messages({
        "string.base": "Middle name must be text",
        "any.required": "Middle name is required.",
      }),
      lastName: Joi.string().required().messages({
        "string.base": "Last name must be text",
        "any.required": "Last name is required.",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
        "any.required": "Email address is required",
      }),
      countryOfResidence: Joi.string().required().messages({
        "string.base": "Country of residence must be text",
        "any.required": "Country of residence is required.",
      }),
      state: Joi.string().required().messages({
        "string.base": "State must be text",
        "any.required": "State is required.",
      }),
      phoneNumber: Joi.string()
        .pattern(/^\+?[1-9]\d{1,14}$/)
        .required()
        .messages({
          "string.pattern.base":
            "Please enter a valid international phone number.",
          "any.required": "Phone number is required.",
        }),
      address: Joi.string().required().messages({
        "string.base": "Address must be text",
        "any.required": "Address is required.",
      }),
      dateOfBirth: Joi.string().required().messages({
        "string.base": "Date of birth must be text",
        "any.required": "Date of birth is required.",
      }),
      initialDeposit: Joi.string()
        .pattern(/^\d+(\.\d+)?$/)
        .required()
        .messages({
          "string.pattern.base": "Initial deposit must be a valid number.",
          "any.required": "Initial deposit is required.",
        }),
      accountType: Joi.string()
        .valid(AccountType.Current, AccountType.Savings)
        .required()
        .messages({
          "string.base": `Account type must be either "${AccountType.Current}" or "${AccountType.Savings}"`,
          "any.required": "Account type is required.",
          "any.only": `Account type must be either "${AccountType.Current}" or "${AccountType.Savings}"`,
        }),
      ssn: Joi.string()
        .pattern(/^\d{9}$/) // Ensures exactly 9 digits
        .required()
        .messages({
          "string.pattern.base": "SSN must be a 9-digit number.",
          "any.required": "SSN is required.",
        }),
        occupation: Joi.string().required().messages({
          "string.base": "Occupation must be text",
          "any.required": "Occupation is required.",
        }),
        gender: Joi.string()
        .valid(
          GenderStatus.Male,
          GenderStatus.Female,
        )
        .required()
        .messages({
          "string.base": `Gender must be either: "${GenderStatus.Male}" or "${GenderStatus.Female}".`,
          "any.required": "Gender is required.",
          "any.only": `Gender must be either: "${GenderStatus.Male}" or "${GenderStatus.Female}".`,
        }),
        status: Joi.string()
        .valid(
          GenderStatus.Male,
          GenderStatus.Female,
        )
        .required()
        .messages({
          "string.base": `Gender must be either: "${AccountStatus.Active}" or "${AccountStatus.Hold}".`,
          "any.required": "Gender is required.",
          "any.only": `Gender must be either: "${AccountStatus.Active}" or "${AccountStatus.Hold}".`,
        }),
        maritalStatus: Joi.string()
        .valid(
          MaritialStatus.Divorce,
          MaritialStatus.Married,
          MaritialStatus.Single,
        )
        .required()
        .messages({
          "string.base": `Marital Status must be one of: "${MaritialStatus.Divorce}", "${MaritialStatus.Married}" or "${MaritialStatus.Single}".`,
          "any.required": "Marital Status is required.",
          "any.only": `Marital Status must be one of: "${MaritialStatus.Divorce}", "${MaritialStatus.Married}" or "${MaritialStatus.Single}".`,
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

export const adminValidator = new AdminValidator();
