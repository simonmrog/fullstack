const express = require("express");
const router = express.Router();

const Order = require("../models/order");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().exec();
    res.status(200).send({ status: "ok", orders: orders });
  } catch (err) {
    res.status(400).send({ status:"error", message: `error: ${err.message}` });
  }
});

router.get("/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId).exec();
    res.status(200).send({ status: "ok", order: order });
  } catch (err) {
    res.status(500).send({ status:"error", message: `error: ${err.message}` });
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  try {
    const createdOrder = await Order.create({
      name: body.name,
      desc: body.desc
    });
    res.status(201).send({
      status: "ok",
      message: "Order created sucessfully",
      order: createdOrder
    });
  } catch (err) {
    res.status(500).send({ status:"error", message: `error: ${err.message}` });
  }
});

router.put("/:id", async (req, res) => {
  const orderId = req.params.id;
  const body = req.body;
  try {
    await Order.findByIdAndUpdate(orderId, {
      name: body.name,
      desc: body.desc
    }).exec();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ status:"error", message: `error: ${err.message}` });
  }
});

router.delete("/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    await Order.findByIdAndDelete(orderId).exec();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ status:"error", message: `error: ${err.message}` });
  }
});

module.exports = router;
