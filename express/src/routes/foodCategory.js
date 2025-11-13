import express from "express";
import { updateFoodCategory } from "../resolvers/foodCategory/update-category.js";
import { getFoodCategory } from "../resolvers/foodCategory/get-category.js";
import { createFoodCategory } from "../resolvers/foodCategory/create-category.js";
import { deleteFoodCategory } from "../resolvers/foodCategory/delete-category.js";
export const foodCategoryRouter = express.Router();

foodCategoryRouter.get("/", getFoodCategory);
foodCategoryRouter.post("/", createFoodCategory);
foodCategoryRouter.put("/", updateFoodCategory);
foodCategoryRouter.delete("/", deleteFoodCategory);
