const MealSchema = require("../models/meal");

async function getMeals(req, res) {
  try {
    const meals = await MealSchema.find().exec();
    res.status(200).send({ status: "ok", meals: meals });
  } catch (err) {
    res.status(404).send({ status:"error", message: "Meals Not Found" });
  }
}

async function getMealById(req, res) {
  const mealId = req.params.id;
  try {
    const meal = await MealSchema.findById(mealId).exec();
    res.status(200).send({ status: "ok", meal: meal });
  } catch (err) {
    res.status(404).send({ status:"error", message: "Meal Not Found" });
  }
}

async function createMeal(req, res) {
  const body = req.body;
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
}

async function updateMeal(req, res) {
  const mealId = req.params.id;
  const body = req.body;
  try {
    await MealSchema.findByIdAndUpdate(mealId, {
      name: body.name,
      desc: body.desc
    }).exec();
    res.status(200).send({
      status: "ok",
      message: "meal updated sucessfully",
    });
  } catch (err) {
    res.status(500).send({ status:"error", message: `error: ${err.message}` });
  }
}

async function deleteMeal(req, res) {
  const mealId = req.params.id;
  try {
    await MealSchema.findByIdAndDelete(mealId).exec();
    res.status(200).send({
      status: "ok",
      message: "meal deleted sucessfully",
    });
  } catch (err) {
    res.status(500).send({ status:"error", message: `error: ${err.message}` });
  }
}

module.exports = {
  getMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal
};
