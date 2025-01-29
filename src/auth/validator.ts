import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { AccountOwnership, AccountType, MessageResponse } from "../utils/enum";

class AuthValidator {
  public async signUp(req: Request, res: Response, next: NextFunction) {
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
      userName: Joi.string().required().messages({
        "string.base": "User name must be text",
        "any.required": "User name is required.",
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
          "string.pattern.base": "Please enter a valid international phone number.",
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
      password: Joi.string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
        .required()
        .messages({
          "any.required": "Password is required.",
          "string.min": "Password must be at least 8 characters long",
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        }),
      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "any.required": "Confirm Password is required.",
          "any.only": "Passwords do not match",
        }),
      accountType: Joi.string()
        .valid(AccountType.Current, AccountType.Savings)
        .required()
        .messages({
          "string.base": `Account type must be either "${AccountType.Current}" or "${AccountType.Savings}"`,
          "any.required": "Account type is required.",
          "any.only": `Account type must be either "${AccountType.Current}" or "${AccountType.Savings}"`,
        }),
      accountOwnership: Joi.string()
        .valid(
          AccountOwnership.Company,
          AccountOwnership.Joint,
          AccountOwnership.Personal,
          AccountOwnership.Others
        )
        .required()
        .messages({
          "string.base": `Account ownership must be one of: "${AccountOwnership.Company}", "${AccountOwnership.Joint}", "${AccountOwnership.Personal}", or "${AccountOwnership.Others}".`,
          "any.required": "Account ownership is required.",
          "any.only": `Account ownership must be one of: "${AccountOwnership.Company}", "${AccountOwnership.Joint}", "${AccountOwnership.Personal}", or "${AccountOwnership.Others}".`,
        }),
        initialDeposit: Joi.string()
        .pattern(/^\d+(\.\d+)?$/)
        .required()
        .messages({
          "string.pattern.base": "Initial deposit must be a valid number.",
          "any.required": "Initial deposit is required.",
        }),
      agreeToTerms: Joi.boolean().valid(true).required().messages({
        "any.required": "You must agree to the terms & conditions of use.",
        "any.only": "You must agree to the terms & conditions of use.",
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

    // Validate image files
    if (!req.files || !("proofOfAddress" in req.files)) {
      console.log(req.files );
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Proof of address is required",
        data: null,
      });
    }

    if (!("profilePicture" in req.files)) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Profile picture is required",
        data: null,
      });
    }

    const allowedMimeTypes = ["image/png", "image/jpg"];

    // Validate MIME type before uploading
    for (const key of ["proofOfAddress", "profilePicture"]) {
      const file = (req.files)[key][0];

      if (!allowedMimeTypes.includes(file.mimetype)) {
        return res.status(400).json({
          message: MessageResponse.Error,
          description: `${key} must be a valid image file (JPG, PNG)`,
          data: null,
        });
      }
    }

    

   return next();
  }
}

export const authValidator = new AuthValidator();

