export interface IUserInput {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  userName: string;
  countryOfResidence: string;
  state: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
  accountType: string;
  accountOwnership: string;
  initialDeposit: string;
  profilePicture: string;
  proofOfAddress: string;
  transferPin: string;
  confirmTransferPin: string;
  ssn: string;
  agreeToTerms: boolean;
  occupation: string;
  gender: string;
  maritalStatus: string;

}

export interface IUser {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  userName: string;
  countryOfResidence: string;
  state: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  password: string;
  accountType: string;
  accountOwnership: string;
  initialDeposit: string;
  profilePicture: string;
  proofOfAddress: string;
  transferPin: string;
  ssn: string;
  occupation: string;
  gender: string;
  maritalStatus: string;
  status: string;
  accountNo: string;
  monthlyIncome: string;
  emailVerificationOtp: string | undefined;
  emailVerificationOtpExpiration: Date | undefined;
  updatedAt: Date;
  createdAt: Date;
}


export interface IUserUpdate {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  countryOfResidence: string;
  state: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  accountType: string;
  initialDeposit: string;
  ssn: string;
  occupation: string;
  gender: string;
  maritalStatus: string;
  status: string;
  monthlyIncome: string;
}
