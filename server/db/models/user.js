"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Player }) {
      this.hasMany(Player, { foreignKey: "userId" });
      // define association here
    }
  }
  User.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      email: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      password: {
        type: DataTypes.TEXT,
      },
      avatar: {
        defaultValue:
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        allowNull: true,
        type: DataTypes.TEXT,
      },
      wins: {
        defaultValue: 0,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      losses: {
        defaultValue: 0,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      isAdmin: {
        defaultValue: false,
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
