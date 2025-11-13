import { foodOrderModel } from "../../model/foodOrder-model.js";

export const createFoodOrder = async (req, res) => {
  const newUser = req.body;
  console.log(newUser);

  try {
    await foodOrderModel.create({
      user: req.body.user,
      totalPrice: req.body.totalPrice,
      foodOrderItems: req.body.foodOrderItems,
      status: req.body.status,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    });
    res.send("New user added");
  } catch (error) {
    res.send(error);
  }
};
