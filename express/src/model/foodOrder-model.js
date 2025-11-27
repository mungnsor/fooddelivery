import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const foodOrderItem = new Schema({
  food: {
    type: ObjectId,
    ref: "foodModel",
  },
  quantity: Number,
});

const FoodOrderSchema = new Schema({
  id: ObjectId,
  user: { type: ObjectId, ref: "user" },
  totalPrice: { type: Number, require: true },
  foodOrderItems: [foodOrderItem],
  status: {
    type: String,
    enum: ["PENDING", "CANCELED", "DELIVERED"],
  },
  address: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export const foodOrderModel = mongoose.model("foodOrder", FoodOrderSchema);
