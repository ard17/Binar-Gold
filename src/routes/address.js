const express = require("express");
const addressRouter = express.Router();

const { addressController } = require("../controllers");

addressRouter
  .get("/", addressController.listAddress)
  .post("/", addressController.createAddress)
  .get("/:id", addressController.detailAddress)
  .put("/:id", addressController.updateAddress)
  .delete("/:id", addressController.deleteAddress)
  .get("/user/:user_id", addressController.listAddress);

module.exports = addressRouter;
