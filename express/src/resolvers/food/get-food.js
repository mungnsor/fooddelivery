import { foodModel } from "../../model/food-model.js";
export const getFood = async (req, res) => {
  const dbFood = await foodModel.find().populate("category");
  res.status(200).json(dbFood);
};
