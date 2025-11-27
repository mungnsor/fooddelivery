import { foodOrderModel } from "../../model/foodOrder-model.js";

export const getOrderById = async (req, res) => {
  const userId = req.params.userId;
  const dbOrders = await foodOrderModel.find({ user: userId }).populate([
    "user",
    "foodOrderItems.food",
    {
      path: "foodOrderItems.food",
      populate: "category",
    },
  ]);
  res.status(200).json(dbOrders);
};
