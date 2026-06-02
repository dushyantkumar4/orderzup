import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    customerId: { type: String, required: true },
    paymentMethod: { type: String, enum: ["UPI_QR", "CARD"], required: true },
    status: { type: String, default: "NEW" }, // NEW, PENDING, CHARGED, FAILED
  },
  { timestamps: true },
);

export default model("Order", OrderSchema);
