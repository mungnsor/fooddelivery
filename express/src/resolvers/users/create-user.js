import { userModel } from "../../model/user-model.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const newUser = req.body;

  const hashPassword = bcrypt.hashSync(newUser.password, 10);

  try {
    await userModel.create({
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      password: hashPassword,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      address: newUser.address,
    });
    res.status(201).json({ message: "New user added", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};
