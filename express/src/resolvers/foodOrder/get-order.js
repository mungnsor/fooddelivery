import { foodOrderModel } from "../../model/foodOrder-model.js";
export const getFoodOrder = async (req, res) => {
  const dbFoodOrder = await foodOrderModel.find().populate([
    "user",
    "foodOrderItems.food",
    {
      path: "foodOrderItems.food",
      populate: "category",
    },
  ]);

  res.status(200).json(dbFoodOrder);
};
