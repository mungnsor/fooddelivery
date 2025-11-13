import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { foodRouter } from "./routes/food.js";
import { foodCategoryRouter } from "./routes/foodCategory.js";
import { foodOrderRouter } from "./routes/foodOrder.js";
import cors from "cors";
const port = 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/food", foodRouter);
app.use("/foodOrder", foodOrderRouter);
app.use("/foodCategory", foodCategoryRouter);
mongoose
  .connect("mongodb+srv://zolboo:zolboo1234@food.n4cxbog.mongodb.net/")
  .then(() => console.log("Connected"));
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
