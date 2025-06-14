import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { AccountOwnership, AccountType, MessageResponse } from "../utils/enum";
import { GenderStatus, MaritialStatus } from "../user/enum";

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
        .valid(AccountType.Current,
          AccountType.Savings,
          AccountType.Checking,
          AccountType.Domiciliary,
          AccountType.Fixed,
          AccountType.Joint,
          AccountType.OnlineBanking,
          AccountType.NonResident)
        .required()
        .messages({
          "string.base": `Account type must be either "${AccountType.Current}", "${AccountType.OnlineBanking}", "${AccountType.Savings}", "${AccountType.Checking}, "${AccountType.Domiciliary}", "${AccountType.Fixed}", "${AccountType.Joint}", or "${AccountType.NonResident}".`,
          "any.required": "Account type is required.",
          "any.only": `Account type must be either "${AccountType.Current}", "${AccountType.OnlineBanking}", "${AccountType.Savings}", "${AccountType.Checking}, "${AccountType.Domiciliary}", "${AccountType.Fixed}", "${AccountType.Joint}", or "${AccountType.NonResident}".`, 
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
        monthlyIncome: Joi.string()
        .pattern(/^\d+(\.\d+)?$/)
        .required()
        .messages({
          "string.pattern.base": "Monthly must be a valid number.",
          "any.required": "Monthly is required.",
        }),
      agreeToTerms: Joi.boolean().valid(true).required().messages({
        "any.required": `Agree to terms is requiredbut you sent ${Joi.ref('agreeToTerms')}.`,
        "any.only": `You must agree to the terms & conditions of use but you sent ${Joi.ref('agreeToTerms')}.`,
      }),
      transferPin: Joi.string()
        .pattern(/^\d{4}$/) // Ensures exactly 4 digits
        .required()
        .messages({
          "string.pattern.base": "Transfer pin must be a 4-digit number.",
          "any.required": "Transfer pin is required.",
        }),
        confirmTransferPin: Joi.string()
        .valid(Joi.ref("transferPin"))
        .required()
        .messages({
          "any.required": "Confirm transfer pin is required.",
          "any.only": "Transfer pins do not match",
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

    // Validate image files
    if (!req.files || !("proofOfAddress" in req.files)) {
      console.log(req.files);
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

    const profilePicture = req.files['profilePicture'][0];
    const proofOfAddress = req.files['proofOfAddress'][0];

    if (!['image/jpeg', 'image/png'].includes(profilePicture.mimetype)) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Profile picture must be a JPEG or PNG image",
        data: null,
      });
    }

    if (!['image/jpeg', 'image/png'].includes(proofOfAddress.mimetype)) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Proof of address must be a JPEG or PNG image",
        data: null,
      });
    }
    return next();
  }


  public async signIn(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
        "any.required": "Email address is required",
      }),   
      password: Joi.string().required().messages({
        "any.required": "Password is required.",
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

  public async validateEmail(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.base": "Email must be text",
        "strig.email": "Invalid email format",
        "any.required": "Email is required.",
      }),
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

  public async forgotPasswordChange(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.base": "Email must be text",
        "strig.email": "Invalid email format",
        "any.required": "Email is required.",
      }),
      otp: Joi.string().required().messages({
        "any.required": "OTP is required.",
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
}

export const authValidator = new AuthValidator();
