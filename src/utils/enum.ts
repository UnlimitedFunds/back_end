export enum MessageResponse {
  Error = "error",
  Success = "success",
}

export enum AccountType {
  Savings = "Savings",
  Current = "Current",
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

