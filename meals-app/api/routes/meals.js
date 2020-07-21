const express = require("express");
const router = express.Router();

const mealsController = require("../controllers/meals");

router.get("/", mealsController.getMeals);
router.get("/:id", mealsController.getMealById);
router.post("/", mealsController.createMeal);
router.put("/:id", mealsController.updateMeal);
router.delete("/:id", mealsController.deleteMeal);

module.exports = router;
