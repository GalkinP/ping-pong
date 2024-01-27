"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Player }) {
      this.hasMany(Player, { foreignKey: "tournamentId" });
    }
  }
  Tournament.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      date: {
        type: DataTypes.DATE,
      },
      status: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      players: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },
      gameType: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Tournament",
    }
  );
  return Tournament;
};
