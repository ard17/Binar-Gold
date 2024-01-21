// controllers/userController.js
const { User } = require("../models");
const { ErrorMessage, Response } = require("../helpers");

const listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "username", "is_login"],
      paranoid: false,
    });
    res.status(200).json(Response.Success(users));
  } catch (error) {
    res.status(500).json(Response.Failed(error.message));
  }
};

const detailUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      attributes: ["id", "email", "username", "is_login"],
    });
    res.status(200).json(Response.Success(user));
  } catch (error) {
    res.status(500).json(Response.Failed(error.message));
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username, password } = req.body;

    const [rowCount, updatedUsers] = await User.update(
      { email, username, password },
      {
        where: { id },
        returning: ["id", "email", "username", "is_login"],
      }
    );
    if (rowCount > 0) {
      res.status(200).json(Response.Success(updatedUsers[0]));
    } else {
      res.status(404).json(Response.Failed(ErrorMessage.UserNotFound));
    }
  } catch (error) {
    res.status(400).json(Response.Failed(error.message));
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.status(200).json(Response.Success());
  } catch (error) {
    res.status(400).json(Response.Failed(error.message));
  }
};

const restoreUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.restore({ where: { id } });
    res.status(200).json(Response.Success());
  } catch (error) {
    res.status(400).json(Response.Failed(error.message));
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { dataValues } = await User.findOne({
      where: { username, email },
      paranoid: false,
    });
    if (dataValues) {
      const id = dataValues.id;
      await User.restore({ where: { id } });
    } else {
      await User.create({ email, username, password });
    }
    res.status(201).json(Response.Success());
  } catch (error) {
    res.status(400).json(Response.Failed(error.message));
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [rowCount, updatedUsers] = await User.update(
      { is_login: true },
      {
        where: { username, password },
        returning: ["id", "email", "username"],
      }
    );
    if (rowCount > 0) {
      res.status(200).json(Response.Success(updatedUsers[0]));
    } else {
      res.status(400).json(Response.Failed(ErrorMessage.LoginFailed));
    }
  } catch (error) {
    res.status(400).json(Response.Failed(error.message));
  }
};

const logout = async (req, res) => {
  try {
    const { id } = req.body;

    const [rowCount] = await User.update(
      { is_login: false },
      {
        where: { id, is_login: true },
      }
    );

    if (rowCount > 0) {
      res.status(200).json(Response.Success());
    } else {
      res.status(400).json(Response.Failed());
    }
  } catch (error) {
    res.status(400).json(Response.Failed(error.message));
  }
};

module.exports = {
  listUsers,
  detailUser,
  updateUser,
  deleteUser,
  restoreUser,
  register,
  login,
  logout,
};
