const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Welcome to the API!"});
});

app.post("/chatgpt", (req, res) => {
  res.json({ status: "ok", message: "Hi from ChatGPT" })
});

module.exports = app;
