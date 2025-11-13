import { foodCategoryModel } from "../../model/foodCategory-model.js";
export const updateFoodCategory = async (req, res) => {
  const dbFoodCategory = await foodCategoryModel.findByIdAndUpdate(
    req.body.id,
    {
      categoryName: req.body.categoryName,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    }
  );
  res.status(200).json(dbFoodCategory);
};
