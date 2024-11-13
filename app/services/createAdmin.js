import AdminProfileModel from "@/app/models/AdminProfileModel";
import AuthModel from "@/app/models/AuthModel";
import bcrypt from "bcrypt";

const createAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  try {
    const findUser = await AuthModel.findOne({ role: "admin" });
    if (!findUser) {
      const hashed = await bcrypt.hash(password, 10);
      const userObj = {
        email,
        password: hashed,
      };
      await new AuthModel(userObj).save();
      await new AdminProfileModel().save();
    }
  } catch {
    console.log("Server error occured!");
  }
};

export default createAdmin;
