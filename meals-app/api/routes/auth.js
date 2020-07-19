const express = require("express");
const router = express.Router();

const UserSchema = require("../models/user");

router.post("/register", function(req, res) {
  res.status(200).send("registrando");
});

router.post("/login", function(req, res) {
  res.status(200).send("logging")
});

module.exports = router;
