const platesRouter = require("./meals");
const ordersRouter = require("./orders");
const authRouter = require("./auth");

module.exports = app => {
  app.use("/api/meals", platesRouter);
  app.use("/api/orders", ordersRouter);
  app.use("/api/auth", authRouter);

  app.get("*", (req, res) => {
    res.status(200).send({ message: "page not found" });
  });
};
