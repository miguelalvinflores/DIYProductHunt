'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING(280),
        allowNull:false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {model:"Users"}
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {model:"Products"}
      },
      wasEdited: {
        type: Sequelize.BOOLEAN,
        // allowNull: false,
        // defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};
