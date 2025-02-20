import { ITransferInput } from "./interface";
import Transfer from "./entity";

class TransferService {
  public async createTransfer(input: ITransferInput) {
    let newTransfer = new Transfer({
      ...input,
      amount: input.amount.toString(),
      serviceFee: input.serviceFee.toString()
    });

    newTransfer = await newTransfer.save();

    return newTransfer;
  }

  public async fetchUserTransferById(id: string) {
    const transfer = Transfer.find({ userId: id });

    return transfer;
  }
}

export const transferService = new TransferService();
