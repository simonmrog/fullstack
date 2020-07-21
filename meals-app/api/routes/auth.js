const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const usersController = require("../controllers/users");
const { isAuth } = require("../middlewares/auth");

router.get("/me", isAuth, usersController.getUserData);
router.post("/register", usersController.registerUser);
router.post("/login", usersController.loginUser);

module.exports = router;
