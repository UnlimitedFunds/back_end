export enum MessageResponse {
  Error = "error",
  Success = "success",
}

export enum AccountType {
  Savings = "Savings",
  Current = "Current",
  Checking = "Checking",
  Fixed = "Fixed",
  NonResident = "NonResident",
  OnlineBanking = "Online Banking",
  Domiciliary = "Domiciliary",
  Joint = "Joint"
}

export enum TransferType {
  Domestic = "Domestic",
  Wire = "Wire",
}

export enum AccountOwnership {
  Company = "Company",
  Personal = "Personal",
  Joint = "Joint",
  Others = "Others",
}

interface MulterFiles {
  [fieldname: string]: Express.Multer.File[];
}

export enum TransactionType {
  Debit = "debit",
  Credit = "credit",
}

