import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    productName: { type: String, required: true },
    productQuantity: { type: Number, required: true, min: 1 },
    productWeight: { type: String, required: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pinCode: { type: String, required: true },
  },
  { timestamps: true },
);

export default model("Order", orderSchema);
