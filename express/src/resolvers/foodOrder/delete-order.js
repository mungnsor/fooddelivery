import { foodOrderModel } from "../../model/foodOrder-model.js";
export const deleteFoodOrder = async (req, res) => {
  try {
    const dbFoodOrder = await foodOrderModel.findByIdAndDelete(req.body.id, {
      user: req.body.user,
      totalPrice: req.body.totalPrice,
      foodOrderItems: req.body.foodOrderItems,
      status: req.body.status,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
      address: req.body.address,
    });
    res.status(200).json(dbFoodOrder);
  } catch (error) {
    res.send(error);
  }
};
