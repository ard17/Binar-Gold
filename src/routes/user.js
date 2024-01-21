const express = require("express");
const userRouter = express.Router();
const authRouter = express.Router();

const { userController } = require("../controllers");

userRouter
  .get("/", userController.listUsers)
  .get("/:id", userController.detailUser)
  .put("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser)
  .get("/restore/:id", userController.restoreUser);

authRouter
  .post("/register", userController.register)
  .post("/login", userController.login)
  .post("/logout", userController.logout);

module.exports = { userRouter, authRouter };
