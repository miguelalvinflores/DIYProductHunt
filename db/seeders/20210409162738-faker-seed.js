"use strict";

const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {


    const usersArray = [{ userName: "DemoUser", emailAddress: "demo@gmail.com", firstName: "Demo", lastName: "User", profilePicURL: 'http://atlas-content-cdn.pixelsquid.com/stock-images/crash-test-dummy-head-XordO9A-600.jpg', hashedPW: "D756IK", createdAt: new Date(), updatedAt: new Date() }]
    
    for (let i = 0; i < 9; i++) {
      const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()
      const user = {
        userName: `${firstName}.${lastName}`,
        emailAddress: `${firstName}.${lastName}@fake-email.com`,
        firstName,
        lastName,
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
    
    const commentMaker = () => {
      const randNum = Math.floor(Math.random() * 3.5);
      const comments = [
        `This product is so ${faker.commerce.productAdjective}!!!`,
        `${faker.company.catchPhrase()}`,
        `So cool! I want one in ${faker.commerce.color()}`,
        `I am willing to pay you ${faker.finance.currencySymbol()} ${(Math.floor(Math.random() * 100))} and a ${faker.animal.crocodilia()} skin ${faker.commerce.product().toLowerCase()} for this!!!`
      ]
      return comments[randNum];
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 3; j++) {
        const product = products[(i * 3) + j];
        for (let a = 0; a < 3; a++) {
          const user = users[Math.floor(Math.random() * 10)];
          const comment = {
            content: commentMaker(),
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
