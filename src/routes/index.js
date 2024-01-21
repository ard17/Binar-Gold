const express = require("express");
const addressRouter = require("./address");
const itemRouter = require("./item");
const orderRouter = require("./order");
const { authRouter, userRouter } = require("./user");
const router = express.Router();

router.use("/addresses", addressRouter);
router.use("/auth", authRouter);
router.use("/items", itemRouter);
router.use("/orders", orderRouter);
router.use("/users", userRouter);

module.exports = router;
