const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const router = require("./routes");

// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

// router
router(app);

module.exports = app;
