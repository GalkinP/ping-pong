'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Tournament}) {
    //  this.belongsTo(Team, { foreignKey: "teamId" });
     this.belongsTo(User, { foreignKey: "userId" });
     this.belongsTo(Tournament, { foreignKey: "tournamentId" });
    }
  }
  Player.init({

    teamId: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    isWin: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    },
    tournamentId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Tournaments",
        key: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    },

  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};