'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.changeColumn("users", "password", {
    //   type: Sequelize.STRING(100),
    //   allowNull: true,
    // });
    // // await queryInterface.changeColumn("users", "email", {
    // //   type: Sequelize.STRING(100),
    // //   unique: false,
    // // })
    // await queryInterface.remove("users", "password", {
    //   type: Sequelize.STRING(100),
    //   allowNull: true,
    // });
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.changeColumn("users", "password", {
    //   type: Sequelize.STRING(100),
    //   allowNull: true,
    // });
  }
};
