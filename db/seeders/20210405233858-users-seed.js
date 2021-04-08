'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [
        {userName:"JohnQ", emailAddress: "johnQ@gmail.com", firstName: "John", lastName: "Quill", profilePicURL: 'image.jpg', hashedPW: "H756IK", createdAt: new Date(), updatedAt: new Date() }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});

  }
};
