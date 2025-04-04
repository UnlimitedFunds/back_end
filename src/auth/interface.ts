export interface IOTP {
  email: string;
  otp?: string;
  fullName?: string;
}

export interface IVerifiedEmail {
  email: string;
}


export interface GoogleUserInfo {
  email: string;
  name: string;
  picture: string;
  sub: string; 
}

export interface MulterFiles {
  [fieldname: string]: Express.Multer.File[];
}