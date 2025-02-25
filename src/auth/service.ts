import { Request } from "express";

import { IOTP, IVerifiedEmail } from "./interface";
import User from "../user/entity";


class AuthService {
    public async saveOtp(input: IOTP) {
        const { otp, email } = input;
    
        const user = await User.findOne({
          email: email,
        });
    
          user!.emailVerificationOtp = otp;
          //3600000 is in milisecs and this is 1hr, so the token is valid for 1 hour
          user!.emailVerificationOtpExpiration = new Date(Date.now() + 3600000);
          await user!.save();
        
    
        return user;
      }

      public async deleteOtp(email: string) {
        const user = await User.findOne({ email });
    
        if (user) {
          user.emailVerificationOtp = undefined;
          user.emailVerificationOtpExpiration = undefined;
          await user.save();
        }
        return user;
      }

      public async changePassword(email: string, password: string) {
        const user = await User.findOne({ email });
    
        if (user) {
          user.password = password;
          await user.save();
        }
        return user;
      }

      public async validateOtp(email: string, otp: string) {
        const otp_validity = await User.findOne({
          email: email,
          emailVerificationOtp: otp,
        });
    
        return otp_validity;
      }
}

export const authService = new AuthService();
