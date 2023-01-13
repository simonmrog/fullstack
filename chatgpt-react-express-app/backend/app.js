const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

// OpenAI Configuration
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", async (req, res) => {
  res.json({ status: "ok", message: "Welcome to the API!"});
});

app.post("/chatgpt", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 1000,
    temperature: 0,
  });
  console.log(response.data);
  if (!response.data || !response.data.choices)
    return res.json({ status: "error", message: "Internal Server Error"});
  return res.json({
    status: "ok",
    message: response.data.choices[0].text
  });
});

module.exports = app;
