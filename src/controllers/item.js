// controllers/userController.js
const { Op } = require("sequelize");
const { Item } = require("../models");
const { ErrorMessage, Response } = require("../helpers");

const listItems = async (req, res) => {
  try {
    const {
      page,
      pageSize,
      minPrice,
      maxPrice,
      orderBy,
      orderType = "ASC",
    } = req.query;
    const items = await Item.findAll({
      where:
        minPrice && maxPrice
          ? {
              price: {
                [Op.between]: [minPrice, maxPrice],
              },
            }
          : minPrice
          ? {
              price: {
                [Op.gte]: minPrice,
              },
            }
          : maxPrice && {
              price: {
                [Op.lte]: maxPrice,
              },
            },
      ...(page &&
        pageSize && {
          offset: (page - 1) * pageSize,
          limit: pageSize,
        }),
      ...(orderBy && { order: [[orderBy, orderType]] }),
      attributes: ["id", "name", "description", "price", "quantity", "image"],
    });
    res.status(200).json(Response.Success(items));
  } catch (error) {
    res.status(500).json(Response.Failed(error.message));
  }
};

const detailItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findOne({
      where: { id },
      attributes: ["id", "name", "description", "price", "quantity", "image"],
    });
    res.status(200).json(Response.Success(item));
  } catch (error) {
    res.status(500).json(Response.Failed(error.message));
  }
};

const createItem = async (req, res) => {
  try {
    const { name, description, price, quantity, image } = req.body;
    await Item.create({ name, description, price, quantity, image });
    res.status(201).json(Response.Success());
  } catch (error) {
    res.status(400).json(Response.Failed(error.message));
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, image } = req.body;

    const [rowCount, updatedItems] = await Item.update(
      { name, description, price, quantity, image },
      {
        where: { id },
        returning: ["id", "name", "description", "price", "quantity", "image"],
      }
    );
    if (rowCount > 0) {
      res.status(200).json(Response.Success(updatedItems[0]));
    } else {
      res.status(404).json(Response.Failed(ErrorMessage.ItemNotFound));
    }
  } catch (error) {
    res.status(400).json(Response.Failed(error.message));
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Item.destroy({ where: { id } });
    res.status(200).json(Response.Success());
  } catch (error) {
    res.status(400).json(Response.Failed(error.message));
  }
};

const restoreItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Item.restore({ where: { id } });
    res.status(200).json(Response.Success());
  } catch (error) {
    res.status(400).json(Response.Failed(error.message));
  }
};

module.exports = {
  listItems,
  detailItem,
  createItem,
  updateItem,
  deleteItem,
  restoreItem,
};
