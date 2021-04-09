'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: faker.commerce.productName(),
        photoURL: faker.image.image(),
        summary: faker.lorem.sentence(),
        description: faker.lorem.paragraph,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    //  {
    //     name: "Screwdriver",
    //     photoURL: "https://www.wildetool.com/wp-content/uploads/2017/02/085432021700.png",
    //     summary: "A small, handmade wooden screwdriver perfect for screwing things.",
    //     description: "A screwdriver is a tool, manual or powered, used for screwing (installing) and unscrewing (removing) screws. A typical simple screwdriver has a handle and a shaft, ending in a tip the user puts into the screw head before turning the handle. This form of the screwdriver has been replaced in many workplaces and homes with a more modern and versatile tool, a power drill, as they are quicker, easier, and also can drill holes. The shaft is usually made of tough steel to resist bending or twisting. The tip may be hardened to resist wear, treated with a dark tip coating for improved visual contrast between tip and screw—or ridged or treated for additional 'grip'. Handles are typically wood, metal, or plastic[1] and usually hexagonal, square, or oval in cross-section to improve grip and prevent the tool from rolling when set down. Some manual screwdrivers have interchangeable tips that fit into a socket on the end of the shaft and are held in mechanically or magnetically. These often have a hollow handle that contains various types and sizes of tips, and a reversible ratchet action that allows multiple full turns without repositioning the tip or the user's hand.",
    //     userId: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //  },
    //  {
    //    name: "Hammer",
    //    photoURL: "https://www.pngkit.com/png/detail/57-573304_thor-hammer-transparent-background.png",
    //    summary: "Very big hammer, not for children.",
    //    description: "Mjölnir (from Old Norse Mjǫllnir) is the hammer of the god Thor in Norse mythology, used both as a devastating weapon and as a divine instrument to provide blessings. The hammer is attested in numerous sources, including 11th century runic Kvinneby amulet, and the Poetic Edda, a collection of eddic poetry compiled in the 13th century, and the Prose Edda, a collection of prose and poetry compiled in the 13th century. The hammer was commonly worn as a pendant during the Viking Age in the Scandinavian cultural sphere, and Thor and his hammer occur depicted on a variety of objects from the archaeological record. Today the symbol appears in a wide variety of media and is again worn as a pendant by various groups, including adherents of modern Heathenry.",
    //    userId: 1,
    //    createdAt: new Date(),
    //    updatedAt: new Date()
    //  },
    //  {
    //    name: "Nike Airforce 1's",
    //    photoURL: "https://cdn.shopify.com/s/files/1/0390/0863/2877/products/IMG_1966_1024x1024@2x.jpg",
    //    summary: "Overpriced footware, cool designs though.",
    //    description: "💚💗💙 POWERPUFF GIRLS 💚💗💙 ⭐️ CUSTOM MADE USING AUTHENTIC NIKE Air Force 1s ⭐️ DESIGNS ARE DOUBLE SEALED TO PREVENT CRACKING/ PEELING OR FADING ALL SIZES ARE ON U.S.SCALE",
    //    userId: 1,
    //    createdAt: new Date(),
    //    updatedAt: new Date()
    //  }
   ], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Products', null, {});
  }
};
