'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Comments', [
        {content: "Your product rocks!", userId:1, productId:3, createdAt: new Date(), updatedAt: new Date()},
        {content: "Love this!", userId:1, productId:3, createdAt: new Date(), updatedAt: new Date()},
      ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Comments', null, {});

  }
};
