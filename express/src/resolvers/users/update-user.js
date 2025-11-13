import { userModel } from "../../model/user-model.js";
export const updateUser = async (req, res) => {
  const dbUser = await userModel.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });
  res.status(200).json(dbUser);
};
