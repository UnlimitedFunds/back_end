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

  public async findTransferById(id: string) {
    const user = await Transfer.findById(id);

    return user;
  }

  public async deleteTransfer(id: string) {
    const user = await Transfer.findOneAndDelete({ _id: id });

    return user;
}

public async updateTransfer(input: ITransferInput, _id: string) {
  const user = await Transfer.findOneAndUpdate(
    { _id }, // Query to find the user by ID
    {
      ...input,
    }, // Update the values
    { new: true } // Return the updated document
  );

  return user;
}
}

export const transferService = new TransferService();
