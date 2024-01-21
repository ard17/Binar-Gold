"use strict";
const { Model } = require("sequelize");
const { ErrorMessage } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsToMany(models.Order, {
        foreignKey: "item_id",
        through: "OrderItem",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Item.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: ErrorMessage.ItemNameRequired },
          notEmpty: { msg: ErrorMessage.ItemNameRequired },
        },
      },
      description: DataTypes.TEXT,
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: ErrorMessage.ItemPriceRequired },
          notEmpty: { msg: ErrorMessage.ItemPriceRequired },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Item",
      tableName: "items",
      paranoid: true,
      timestamps: true,
    }
  );

  Item.has;
  return Item;
};
