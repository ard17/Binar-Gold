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
    const users = await queryInterface.sequelize.query("SELECT id FROM users;");
    const userRows = users[0];
    console.log(userRows);
    await queryInterface.bulkInsert(
      "addresses",
      [
        {
          id: uuidv4(),
          user_id: userRows[0].id,
          province: "DKI Jakarta",
          city: "Jakarta Pusat",
          district: "Gambir",
          sub_district: "Menteng",
          postal_code: "10110",
          address: "Jl. MH Thamrin No. 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          user_id: userRows[0].id,
          province: "Jawa Barat",
          city: "Bandung",
          district: "Regol",
          sub_district: "Andir",
          postal_code: "40184",
          address: "Jl. Asia Afrika No. 65",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          user_id: userRows[0].id,
          province: "Jawa Tengah",
          city: "Semarang",
          district: "Semarang Tengah",
          sub_district: "Gajah Mungkur",
          postal_code: "50123",
          address: "Jl. Pahlawan No. 10",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          user_id: userRows[1].id,
          province: "Bali",
          city: "Denpasar",
          district: "Denpasar Utara",
          sub_district: "Dauh Puri Kauh",
          postal_code: "80233",
          address: "Jl. Hayam Wuruk No. 10",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          user_id: userRows[1].id,
          province: "Sumatera Utara",
          city: "Medan",
          district: "Medan Barat",
          sub_district: "Petisah Tengah",
          postal_code: "20151",
          address: "Jl. Imam Bonjol No. 5",
          createdAt: new Date(),
          updatedAt: new Date(),
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
    const users = await queryInterface.sequelize.query("SELECT id FROM users;");
    const userRows = users[0];

    await queryInterface.bulkDelete(
      "addresses",
      {
        user_id: [userRows[0].id, userRows[1].id],
      },
      {}
    );
  },
};
