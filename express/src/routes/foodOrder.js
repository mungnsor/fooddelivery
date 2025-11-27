import express from "express";
import { getFoodOrder } from "../resolvers/foodOrder/get-order.js";
import { updateFoodOrder } from "../resolvers/foodOrder/update-order.js";
import { deleteFoodOrder } from "../resolvers/foodOrder/delete-order.js";
import { createFoodOrder } from "../resolvers/foodOrder/create-order.js";
import { getOrderById } from "../resolvers/foodOrder/orderByUserId.js";

export const foodOrderRouter = express.Router();

foodOrderRouter.get("/", getFoodOrder);
foodOrderRouter.post("/", createFoodOrder);
foodOrderRouter.get("/:userId", getOrderById);
foodOrderRouter.put("/", updateFoodOrder);
foodOrderRouter.delete("/", deleteFoodOrder);
