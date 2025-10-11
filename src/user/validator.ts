import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { AccountOwnership, AccountType, MessageResponse } from "../utils/enum";
import { GenderStatus, MaritialStatus } from "../user/enum";

class UserValidator {

      public async profileImageUpload(req: Request, res: Response, next: NextFunction) {
    
        // Validate image files
        if (!req.files || !("profilePicture" in req.files)) {
          console.log(req.files);
          return res.status(400).json({
            message: MessageResponse.Error,
            description: "Profile picture is required",
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
    
        if (!['image/jpeg', 'image/png'].includes(profilePicture.mimetype)) {
          return res.status(400).json({
            message: MessageResponse.Error,
            description: "Profile picture must be a JPEG or PNG image",
            data: null,
          });
        }
    }
    
 
}

export const userValidator = new UserValidator();
