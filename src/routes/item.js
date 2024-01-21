const express = require("express");
const itemRouter = express.Router();

const { itemController } = require("../controllers");

itemRouter
  .get("/", itemController.listItems)
  .post("/", itemController.createItem)
  .get("/:id", itemController.detailItem)
  .put("/:id", itemController.updateItem)
  .delete("/:id", itemController.deleteItem)
  .get("/restore/:id", itemController.restoreItem);

module.exports = itemRouter;
