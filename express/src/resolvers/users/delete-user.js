import { userModel } from "../../model/user-model.js";

import jwt from "jsonwebtoken";

export const deleteUser = async (req, res) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, "secret-key");
    const dbUser = await userModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ message: "Deleted", deletedId: dbUser });
  } catch (err) {
    console.log(err);
    res.status(401).send("Unauthorized");
  }
};
