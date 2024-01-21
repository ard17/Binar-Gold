// controllers/userController.js
const { Item, Order, OrderItem, User, sequelize } = require("../models");
const { Response } = require("../helpers");

const listOrders = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const orders = await Order.findAll({
      ...(page &&
        pageSize && {
          offset: (page - 1) * pageSize,
          limit: pageSize,
        }),
      order: [["order_date", "ASC"]],
      attributes: ["id", "user_id", "status", "order_date", "total_price"],
    });
    res.status(200).json(Response.Success(orders));
  } catch (error) {
    res.status(500).json(Response.Failed(error.message));
  }
};

const detailOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id },
      attributes: ["id", "user_id", "status", "order_date", "total_price"],
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "username", "email"],
        },
        {
          model: Item,
          as: "items",
          attributes: ["id", "name", "description", "price", "image"],
          through: { attributes: ["quantity"] },
        },
      ],
    });
    res.status(200).json(Response.Success(order));
  } catch (error) {
    res.status(500).json(Response.Failed(error.message));
  }
};

const createOrder = async (req, res) => {
  try {
    const { user_id, items } = req.body;

    let total_price = 0;

    const result = await sequelize.transaction(async (transaction) => {
      const { dataValues: order } = await Order.create(
        { user_id, order_date: new Date().toISOString() },
        { transaction }
      );

      if (order) {
        for (const { id, price, quantity } of items) {
          total_price += price * quantity;
          await OrderItem.create(
            { order_id: order.id, item_id: id, quantity },
            { transaction }
          );
        }
      }
      await Order.update(
        { total_price },
        { where: { id: order.id }, transaction }
      );

      return order;
    });
    res.status(201).json(Response.Success(result));
  } catch (error) {
    res.status(400).json(Response.Failed(error));
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Order.update(
      { status },
      {
        where: { id },
        returning: ["id", "user_id", "status", "order_date", "total_price"],
      }
    );
    res.status(200).json(Response.Success());
  } catch (error) {
    res.status(400).json(Response.Failed(error.message));
  }
};

module.exports = {
  listOrders,
  detailOrder,
  createOrder,
  updateOrder,
};
