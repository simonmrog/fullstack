const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String,
  salt: String,
  role: { type: String, default: "user" }
});

module.exports = mongoose.model("User", UserSchema);
