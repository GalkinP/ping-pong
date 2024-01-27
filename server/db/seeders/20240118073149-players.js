"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Players",
      [
        {
          teamId: 1,
          userId: 1,
          tournamentId: 1,
          isWin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          teamId: 1,
          userId: 2,
          tournamentId: 1,
          isWin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isWin: true,
          teamId: 2,
          userId: 3,
          tournamentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isWin: true,
          teamId: 2,
          userId: 4,
          tournamentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isWin: true,
          teamId: 3,
          userId: 5,
          tournamentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isWin: true,
          teamId: 3,
          userId: 6,
          tournamentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isWin: true,
          teamId: 4,
          userId: 7,
          tournamentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isWin: true,
          teamId: 4,
          userId: 8,
          tournamentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isWin: true,
          teamId: 5,
          userId: 9,
          tournamentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isWin: true,
          teamId: 5,
          userId: 10,
          tournamentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isWin: true,
          teamId: 6,
          userId: 11,
          tournamentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isWin: true,
          teamId: 6,
          userId: 12,
          tournamentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isWin: true,
          teamId: 7,
          userId: 13,
          tournamentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isWin: true,
          teamId: 7,
          userId: 14,
          tournamentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { isWin: true,
          teamId: 8,
          userId: 15,
          tournamentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isWin: true,
          teamId: 8,
          userId: 16,
          tournamentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Players", null, {});
  },
};
