const validator = require("email-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const UserSchema = require("../models/user");

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 365
  });
}

async function registerUser(req, res) {
  try {
    const { email, password } = req.body;
    if (typeof email === "undefined" || typeof password === "undefined")
      throw { code: 400, message: "Invalid Email or Password" };
    const validEmail = validator.validate(email);
    if (!validEmail) throw { code: 400, message: "Invalid Email or Password" };

    const user = await UserSchema.findOne({ email }).exec();
    if (user) throw {
      code: 409,
      message: "User already exists"
    };
    crypto.randomBytes(16, function(err, salt) {
      if (err) res.status(500).send({
        status: "error",
        message: "Internal Server Error"
      });
      else {
        const newSalt = salt.toString("base64");
        crypto.pbkdf2(password, newSalt, 10000, 64, "sha1", async function(err, key) {
          if (err) res.status(500).send({
            status: "error",
            message: "Internal Server Error"
          });
          
          else {
            const encryptedPassword = key.toString("base64");
            const createdUser = await UserSchema.create({
              email,
              password: encryptedPassword,
              salt: newSalt
            });
            if (createdUser) res.status(200).send({
              status: "ok",
              message: "User created successfully"
            });
          }
        });
      }
    });
  } catch (err) {
    const statusCode = err.code || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).send({ status:"error", message });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserSchema.findOne({ email }).exec();

    if (user === null) throw { code: 403, message: "Wrong user and/or password" };
    crypto.pbkdf2(password, user.salt, 10000, 64, "sha1", function(err, key) {
      if (err) res.status(500).send({
        status: "error",
        message: "Internal Server Error"
      });
      else {
        const encryptedPassword = key.toString("base64");
        if (encryptedPassword === user.password) {
          const token = signToken(user._id);
          res.status(200).send({
            status: "ok",
            message: "Logged in successfully",
            token
          });
        }
        else res.status(403).send({
          status: "error",
          message: "Wrong user and/or password"
        });
      }
    });
  } catch (err) {
    const statusCode = err.code || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).send({ status:"error", message });
  }
}

async function getUserData(req, res) {
  console.log(req.user);
  const { email } = req.user;
  res.status(200).send({ status: "ok", email });
}

module.exports = {
  registerUser,
  loginUser,
  getUserData
};
