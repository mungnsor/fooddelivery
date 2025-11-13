import { foodModel } from "../../model/food-model.js";

export const createFood = async (req, res) => {
  await foodModel.create({
    foodName: req.body.foodName,
    price: req.body.price,
    image: req.body.image,
    ingredients: req.body.ingredients,
    category: req.body.category,
    createdAt: req.body.createdAt,
    updateAt: req.body.updateAt,
  });
  res.send("New user added");
};
