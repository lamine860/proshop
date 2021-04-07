import asyncHandler from "express-async-handler";
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
  await order.save()
  return res.status(201).json(order)
  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: "No oreder items" });
  }
});
