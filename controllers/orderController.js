import Order from "../models/PlaceOrder.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// place new order
export const createOrder = asyncHandler(async (req, res) => {
  const {
    productName,
    productQuantity,
    productWeight,
    customerName,
    phone,
    address,
    pinCode,
  } = req.body;

  if (
    !productName ||
    !productQuantity ||
    !productWeight ||
    !customerName ||
    !phone ||
    !address ||
    !pinCode
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const order = await Order.create({
    productName,
    productQuantity,
    productWeight,
    customerName,
    phone,
    address,
    pinCode,
  });

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    order,
  });
});

// Get all orders
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

// Get one order
export const getSingleOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// Edit existing order
export const editOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    updatedOrder,
  });
});

//delete order
export const deleteOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  await Order.findByIdAndDelete(orderId);
  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
