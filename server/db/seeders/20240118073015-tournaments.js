'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Tournaments', [
    {
      title: 'Tournament 1',
      description: 'Tournament 1 description',
      date: new Date('2022-10-15'),
      status: true,
      players: 16,
      gameType: "2x2",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      title: 'Tournament 2',
      description: 'Tournament 2 description',
      date: new Date('2022-10-15'),
      status: true,
      players: 4,
      gameType: "1x1",
      createdAt: new Date(),
      updatedAt: new Date()
     }
  ], {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Tournaments', null, {});
     
  }
};
