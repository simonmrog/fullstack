import express from "express";
import morgan from "morgan";
import expressValidator from "express-validator";

import router from "./routes/index.js";

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressValidator());
router(app);

export default app;
