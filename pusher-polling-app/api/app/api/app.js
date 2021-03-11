"use strict";

import express from "express";
import morgan from "morgan";
import cors from "cors";

import router from "../routes/index.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
router(app);

export default app;
