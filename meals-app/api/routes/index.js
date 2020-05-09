const platesRouter = require("./meals");
const ordersRouter = require("./orders");

module.exports = app => {
  app.use("/api/meals", platesRouter);
  app.use("/api/orders", ordersRouter);

  app.get("*", (req, res) => {
    res.status(200).send({ message: "page not found" });
  });
};
