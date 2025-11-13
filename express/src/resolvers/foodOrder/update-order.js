import { foodOrderModel } from "../../model/foodOrder-model.js";
export const updateFoodOrder = async (req, res) => {
  try {
    const dbFoodOrder = await foodOrderModel.findByIdAndUpdate(req.body.id, {
      user: req.body.user,
      totalPrice: req.body.totalPrice,
      foodOrderItems: req.body.foodOrderItems,
      status: req.body.status,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    });
    res.status(200).json(dbFoodOrder);
  } catch (error) {
    res.send(error);
  }
};
