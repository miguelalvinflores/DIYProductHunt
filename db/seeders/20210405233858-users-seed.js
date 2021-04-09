'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [
        {userName:"DemoUser", emailAddress: "demo@gmail.com", firstName: "Demo", lastName: "User", profilePicURL: 'http://atlas-content-cdn.pixelsquid.com/stock-images/crash-test-dummy-head-XordO9A-600.jpg', hashedPW: "D756IK", createdAt: new Date(), updatedAt: new Date() },
        {userName:"JohnQ", emailAddress: "johnQ@gmail.com", firstName: "John", lastName: "Quill", profilePicURL: 'https://i.dailymail.co.uk/1s/2019/09/27/12/19007546-0-image-a-17_1569583085317.jpg', hashedPW: "H756IK", createdAt: new Date(), updatedAt: new Date() }
      ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});

  }
};
