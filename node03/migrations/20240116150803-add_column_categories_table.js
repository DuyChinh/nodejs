'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("posts", "categories_id", {
      type: Sequelize.INTEGER,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("posts", "categories_id", {
      type: Sequelize.INTEGER,
    });
  }
};
