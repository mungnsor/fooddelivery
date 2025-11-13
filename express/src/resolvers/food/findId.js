import { foodModel } from "../../model/food-model.js";
export const getFindByCategory = async (req, res) => {
  const dbFindId = await foodModel.find({ category: req.params.id });
  res.status(200).json(dbFindId);
};
