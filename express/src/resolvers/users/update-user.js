import { userModel } from "../../model/user-model.js";
export const updateUser = async (req, res) => {
  const dbUser = await userModel.findByIdAndUpdate(req.body.id, {
    address: req.body.address,
  });
  res.status(200).json(dbUser);
};
