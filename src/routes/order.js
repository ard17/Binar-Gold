const express = require("express");
const orderRouter = express.Router();

const { orderController } = require("../controllers");

orderRouter
  .get("/", orderController.listOrders)
  .post("/", orderController.createOrder)
  .get("/:id", orderController.detailOrder)
  .put("/:id", orderController.updateOrder);

module.exports = orderRouter;
