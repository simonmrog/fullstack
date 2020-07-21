const OrderSchema = require("../models/order");

async function getOrders(req, res) {
  try {
    const orders = await OrderSchema.find().exec();
    res.status(200).send({ status: "ok", orders: orders });
  } catch (err) {
    res.status(404).send({ status:"error", message: "Orders Not Found" });
  }
}

async function getOrderById(req, res) {
  const orderId = req.params.id;
  try {
    const order = await OrderSchema.findById(orderId).exec();
    res.status(200).send({ status: "ok", order: order });
  } catch (err) {
    res.status(404).send({ status:"error", message: "Order Not Found" });
  }
}

async function createOrder(req, res) {
  const { _id } = req.user;
  const body = req.body;
  try {
    const createdOrder = await OrderSchema.create({
      orderId: body.orderId,
      userId: _id
    });
    res.status(201).send({
      status: "ok",
      message: "Order created sucessfully",
      order: createdOrder
    });
  } catch (err) {
    res.status(500).send({ status:"error", message: `error: ${err.message}` });
  }
}

async function updateOrder(req, res) {
  const orderId = req.params.id;
  const body = req.body;
  try {
    await OrderSchema.findByIdAndUpdate(orderId, {
      orderId: body.orderId,
      userId: body.userId
    }).exec();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ status:"error", message: `error: ${err.message}` });
  }
}

async function deleteOrder(req, res) {
  const orderId = req.params.id;
  try {
    await OrderSchema.findByIdAndDelete(orderId).exec();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ status:"error", message: `error: ${err.message}` });
  }
}

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
}