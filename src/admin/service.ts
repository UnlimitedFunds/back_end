import { IAdminUserInput } from "./interface";
import Admin from "./entity";
import User from "../user/entity";
import { AccountStatus } from "../user/enum";
import Transfer from "../transfer/entity";

class AdminService {
  public async createAdmin(input: IAdminUserInput) {
    const { password, userName } = input;

    const admin = new Admin({
      password,
      userName,
    });

    const adminData = await admin.save();

    return adminData;
  }

  public async findAdminByUserNameAndPassword(input: IAdminUserInput) {
    const { password, userName } = input;

    const admin = await Admin.findOne({ userName, password }).select(
      "-password"
    );
    return admin;
  }

  public async fetchAllUsers() {
    const users = User.find().select("-password");

    return users;
  }

  public async fetchAllTransfer() {
    const transfers = Transfer.find();

    return transfers;
  }

  public async approveUser(userId: string) {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { status: AccountStatus.Active } },
      { new: true } // Return the updated document
    );

    return user;
  }

  public async deleteUser(userId: string) {
    const user = await User.findOneAndDelete({ _id: userId });

    return user;
}

}

export const adminService = new AdminService();
