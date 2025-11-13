import express from "express";
import { getFood } from "../resolvers/food/get-food.js";
import { createFood } from "../resolvers/food/create-food.js";
import { updateFood } from "../resolvers/food/update-food.js";
import { deleteFood } from "../resolvers/food/delete-food.js";
import { getFindByCategory } from "../resolvers/food/findId.js";

export const foodRouter = express.Router();

foodRouter.get("/", getFood);
foodRouter.get("/findByCategory/:id", getFindByCategory);
foodRouter.post("/", createFood);
foodRouter.put("/", updateFood);
foodRouter.delete("/", deleteFood);
