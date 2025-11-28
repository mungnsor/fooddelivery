import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  name: String,
  email: String,
  phone: Number,
  password: String,
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  address: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export const userModel = mongoose.model("user", UserSchema);
