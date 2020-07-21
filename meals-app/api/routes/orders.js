const express = require("express");
const router = express.Router();

const { isAuth, hasRole } = require("../middlewares/auth");
const ordersController = require("../controllers/orders");

router.get("/onlyAdmins", isAuth, hasRole.bind(this, "admin"), function(req, res) {
  res.status(200).send({ status: "ok", message: "Endpoint for admins only" });
});

router.get("/", isAuth, ordersController.getOrders);
router.get("/:id", isAuth, ordersController.getOrderById);
router.post("/", isAuth, ordersController.createOrder);
router.put("/:id", isAuth, ordersController.updateOrder);
router.delete("/:id", isAuth, ordersController.deleteOrder);

module.exports = router;
