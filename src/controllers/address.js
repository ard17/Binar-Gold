// controllers/userController.js
const { Address } = require("../models");
const { ErrorMessage, Response } = require("../helpers");

const attributes = [
  "id",
  "user_id",
  "province",
  "city",
  "district",
  "sub_district",
  "postal_code",
  "address",
  "is_main",
];

const listAddressUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const addresses = await Address.findAll({
      where: { user_id },
      attributes,
    });
    res.status(200).json(Response.Success(addresses));
  } catch (error) {
    res.status(500).json(Response.Failed(error.message));
  }
};

const listAddress = async (req, res) => {
  try {
    const { page, pageSize, orderBy, orderType = "ASC" } = req.query;
    const addresses = await Address.findAll({
      ...(page &&
        pageSize && {
          offset: (page - 1) * pageSize,
          limit: pageSize,
        }),
      ...(orderBy && { order: [[orderBy, orderType]] }),
      attributes,
    });
    res.status(200).json(Response.Success(addresses));
  } catch (error) {
    res.status(500).json(Response.Failed(error.message));
  }
};

const detailAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findOne({
      where: { id },
      attributes,
    });
    res.status(200).json(Response.Success(address));
  } catch (error) {
    res.status(500).json(Response.Failed(error.message));
  }
};

const createAddress = async (req, res) => {
  try {
    const {
      user_id,
      province,
      city,
      district,
      sub_district,
      postal_code,
      address,
      is_main,
    } = req.body;
    await Address.create({
      user_id,
      province,
      city,
      district,
      sub_district,
      postal_code,
      address,
      is_main,
    });
    res.status(201).json(Response.Success());
  } catch (error) {
    res.status(400).json(Response.Failed(error.message));
  }
};

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      province,
      city,
      district,
      sub_district,
      postal_code,
      address,
      is_main,
    } = req.body;

    const [rowCount, updatedAddress] = await Address.update(
      {
        province,
        city,
        district,
        sub_district,
        postal_code,
        address,
        is_main,
      },
      {
        where: { id },
        returning: attributes,
      }
    );
    if (rowCount > 0) {
      res.status(200).json(Response.Success(updatedAddress[0]));
    } else {
      res.status(404).json(Response.Failed(ErrorMessage.UserNotFound));
    }
  } catch (error) {
    res.status(400).json(Response.Failed(error.message));
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    await Address.destroy({ where: { id } });
    res.status(200).json(Response.Success());
  } catch (error) {
    res.status(400).json(Response.Failed(error.message));
  }
};

module.exports = {
  listAddressUser,
  listAddress,
  detailAddress,
  createAddress,
  updateAddress,
  deleteAddress,
};
