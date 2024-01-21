"use strict";
const { Model } = require("sequelize");
const { ErrorMessage } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      User.hasMany(models.Address, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: ErrorMessage.EmailNotUnique },
        validate: {
          notNull: { msg: ErrorMessage.EmailRequired },
          notEmpty: { msg: ErrorMessage.EmailRequired },
          isEmail: { msg: ErrorMessage.EmailNotValid },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: { msg: ErrorMessage.UsernameNotUnique },
        validate: {
          notNull: { msg: ErrorMessage.UsernameRequired },
          notEmpty: { msg: ErrorMessage.UsernameRequired },
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: ErrorMessage.PasswordRequired },
          notEmpty: { msg: ErrorMessage.PasswordRequired },
        },
      },
      is_login: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      paranoid: true,
      timestamps: true,
    }
  );
  return User;
};
