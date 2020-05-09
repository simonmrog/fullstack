const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MealSchema = new Schema({
  name: String,
  desc: String
});

module.exports = mongoose.model("Meal", MealSchema);
