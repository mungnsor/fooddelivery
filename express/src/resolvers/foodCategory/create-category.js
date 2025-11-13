import { foodCategoryModel } from "../../model/foodCategory-model.js";

export const createFoodCategory = async (req, res) => {
  await foodCategoryModel.create({
    categoryName: req.body.categoryName,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
  });
  res.send("New user added");
};
