import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Order from "../models/Order.js";

export const placeOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    shippingPrice,
    paymentMethod,
    itemsPrice,
    totalPrice,
    taxPrice,
  } = req.body;
  const order = Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    shippingPrice,
    paymentMethod,
    itemsPrice,
    totalPrice,
    taxPrice,
  });
  await order.save();
  return res.status(201).json(order);
  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: "No oreder items" });
  }
});

export const orderDetails = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(404);
    throw new Error(JSON.stringify({ message: "Page not found" }));
  }
  const order = await Order.findById(orderId).populate("user", "name email");
  if (order) {
    return res.json(order);
  } else {
    res.status(404);
    throw new Error(JSON.stringify({ message: "Page not found" }));
  }
});

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (order) {
    order.paidAt = Date.now();
    order.isPaid = true;
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error(JSON.stringify({ message: "Order not found" }));
  }
});
