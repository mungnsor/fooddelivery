import { foodOrderModel } from "../../model/foodOrder-model.js";
export const updateFoodOrder = async (req, res) => {
  const updatedOrder = req.body;
  await foodOrderModel.findByIdAndUpdate(updatedOrder.id, {
    status: updatedOrder.status,
  });
  res.send("Updated success");
};
