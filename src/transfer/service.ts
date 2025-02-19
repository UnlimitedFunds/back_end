import { ITransferInput } from "./interface";
import Transfer from "./entity";

class TransferService {
  public async createTransfer(input: ITransferInput) {
    let newUser = new Transfer({
      ...input,
    });

    newUser = await newUser.save();

    return newUser;
  }

  public async fetchUserTransferById(id: string) {
    const transfer = Transfer.find({ userId: id });

    return transfer;
  }
}

export const transferService = new TransferService();
