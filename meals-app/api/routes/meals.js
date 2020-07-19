const express = require("express");
const router = express.Router();

const MealSchema = require("../models/meal");

router.get("/", async (req, res) => {
  try {
    const meals = await MealSchema.find().exec();
    res.status(200).send({ status: "ok", meals: meals });
  } catch (err) {
    res.status(400).send({ status:"error", message: `error: ${err.message}` });
  }
});

router.get("/:id", async (req, res) => {
  const mealId = req.params.id;
  try {
    const meal = await MealSchema.findById(mealId).exec();
    res.status(200).send({ status: "ok", meal: meal });
  } catch (err) {
    res.status(500).send({ status:"error", message: `error: ${err.message}` });
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  console.log(body)
  try {
    const createdMeal = await MealSchema.create({
      name: body.name,
      desc: body.desc
    });
    res.status(201).send({
      status: "ok",
      message: "meal created sucessfully",
      meal: createdMeal
    });
  } catch (err) {
    res.status(500).send({ status:"error", message: `error: ${err.message}` });
  }
});

router.put("/:id", async (req, res) => {
  const mealId = req.params.id;
  const body = req.body;
  try {
    await MealSchema.findByIdAndUpdate(mealId, {
      name: body.name,
      desc: body.desc
    }).exec();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ status:"error", message: `error: ${err.message}` });
  }
});

router.delete("/:id", async (req, res) => {
  const mealId = req.params.id;
  try {
    await MealSchema.findByIdAndDelete(mealId).exec();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ status:"error", message: `error: ${err.message}` });
  }
});

module.exports = router;
