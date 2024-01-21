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
      "items",
      [
        {
          id: uuidv4(),
          name: "Blue Denim Jeans",
          description: "Classic blue denim jeans with a straight fit.",
          price: 300000,
          quantity: 50,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          name: "Floral Summer Dress",
          description: "Elegant floral patterned summer dress.",
          price: 250000,
          quantity: 30,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          name: "Men's Casual T-shirt",
          description: "Comfortable and stylish casual t-shirt for men.",
          price: 150000,
          quantity: 100,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          name: "Running Shoes",
          description: "Lightweight running shoes for active lifestyles.",
          price: 400000,
          quantity: 40,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          name: "Leather Jacket",
          description: "Stylish black leather jacket for a bold look.",
          price: 600000,
          quantity: 20,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          name: "Striped Polo Shirt",
          description: "Classic striped polo shirt for a smart-casual look.",
          price: 180000,
          quantity: 60,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          name: "Winter Coat",
          description: "Warm and cozy winter coat for cold seasons.",
          price: 700000,
          quantity: 25,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          name: "Yoga Leggings",
          description:
            "Stretchable and comfortable leggings for yoga sessions.",
          price: 120000,
          quantity: 70,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          name: "Business Suit",
          description: "Formal business suit for professional occasions.",
          price: 800000,
          quantity: 15,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          name: "Graphic Hoodie",
          description: "Trendy graphic hoodie for a casual and stylish look.",
          price: 250000,
          quantity: 50,
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
      "items",
      {
        name: [
          "Blue Denim Jeans",
          "Floral Summer Dress",
          "Men's Casual T-shirt",
          "Running Shoes",
          "Leather Jacket",
          "Striped Polo Shirt",
          "Winter Coat",
          "Yoga Leggings",
          "Business Suit",
          "Graphic Hoodie",
        ],
      },
      {}
    );
  },
};
