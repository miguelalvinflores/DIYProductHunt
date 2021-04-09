"use strict";

const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {


    const usersArray = [{ userName: "DemoUser", emailAddress: "demo@gmail.com", firstName: "Demo", lastName: "User", profilePicURL: 'http://atlas-content-cdn.pixelsquid.com/stock-images/crash-test-dummy-head-XordO9A-600.jpg', hashedPW: "D756IK", createdAt: new Date(), updatedAt: new Date() }]
    
    for (let i = 0; i < 9; i++) {
      const user = {
        userName: faker.internet.userName(),
        emailAddress: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        profilePicURL: faker.image.avatar(),
        hashedPW: bcrypt.hashSync(`password${i}`, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      usersArray.push(user);
    }
    
    const users = await queryInterface.bulkInsert(
      "Users",
      usersArray,
      { returning: true }
    );

    const products = await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[4].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[4].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[4].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[5].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[5].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[5].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[6].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[6].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[6].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[7].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[7].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[7].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[8].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[8].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[8].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[9].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[9].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.commerce.productName(),
          photoURL: faker.image.imageUrl(),
          summary: faker.lorem.sentence(),
          description: faker.commerce.productDescription(),
          userId: users[9].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        /////// Copy and paste as needed, change userId index so all users have products \\\\\\\
      ],
      { returning: true }
    );
    const comments = [];

    for (let i = 0; i < 10; i++) {
      const user = users[i];
      for (let j = 0; j < 3; j++) {
        const product = products[j];
        for (let a = 0; a < 3; a++) {
          const comment = {
            content: faker.lorem.sentence(),
            userId: user.id,
            productId: product.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          comments.push(comment);
        }
      }
    }

    return queryInterface.bulkInsert(
      "Comments",
      comments,
      { returning: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", null, {});
    await queryInterface.bulkDelete("Products", null, {});
    return queryInterface.bulkDelete("Users", null, {});
  },
};
