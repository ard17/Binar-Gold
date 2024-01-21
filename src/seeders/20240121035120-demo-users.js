"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuidv4(),
          email: "user1@example.com",
          username: "coolUser123",
          password: "securePwd123",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          email: "user2@example.com",
          username: "fashionFanatic",
          password: "stylePass456",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          email: "user3@example.com",
          username: "fitnessGeek",
          password: "workout123!",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          email: "user4@example.com",
          username: "travelExplorer",
          password: "adventurePwd789",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          email: "user5@example.com",
          username: "techEnthusiast",
          password: "codeMaster567",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      "users",
      {
        email: [
          "user1@example.com",
          "user2@example.com",
          "user3@example.com",
          "user4@example.com",
          "user5@example.com",
        ],
      },
      {}
    );
  },
};
