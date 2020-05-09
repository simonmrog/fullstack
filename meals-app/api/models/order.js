const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: "Meal"},
  userId: String
});

module.exports = mongoose.model("Order", OrderSchema);
