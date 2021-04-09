"use strict";

const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {


    const usersArray = [{ userName: "DemoUser", emailAddress: "demo@gmail.com", firstName: "Demo", lastName: "User", profilePicURL: 'http://atlas-content-cdn.pixelsquid.com/stock-images/crash-test-dummy-head-XordO9A-600.jpg', hashedPW: "D756IK", createdAt: faker.date.past(), updatedAt: new Date() }]
    
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
        createdAt: faker.date.past(),
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
          name: 'Authentic Sloyd Tool Cabinet',
          photoURL: `https://cdn.popularwoodworking.com/wp-content/uploads/2020/01/lead-glam1a-1.jpg`,
          summary: 'This reproduction is a fun build and a great gift for a budding woodworker.',
          description: '“Hand and heart lead to life.” was an early motto of the North Bennet Street Industrial School (NBIS), now called the North Bennet Street School (NBSS). Founded in 1885 by Pauline Agassiz Shaw, a progressive Boston philanthropist, the school was established to “train students for careers in traditional trades that use hand skills in concert with evolving technology, to preserve and advance craft traditions and promote greater appreciation of craftsmanship.” The school started off as a social and educational experiment designed to help residents in the North End of Boston, many of whom were immigrants, acclimate to America, learn a trade, socialize and become better citizens. In pursuit of this goal Shaw learned of Otto Salomon’s work at the Sloyd School in Naas Sweden and was instrumental in bringing Swedish Educational Sloyd to America. Under the direction of Gustaf Larsson, a graduate of Naas, he helped adapt Educational Sloyd to American needs at NBIS as a training lab and also went on to direct the Sloyd Training School in Boston for training teachers in manual arts instruction. Moving beyond traditional apprenticeships Educational Sloyd was a structured program wherein hand skills are taught by building a series of model projects, deliberately chosen to result in useful household objects prescribed in a specific sequence that helped bolster hand skills, mental skills, confidence and prepare for the next exercise. The goal was to train the “whole person”-the body and the mind working in concert to produce better work, an appreciation for hand work and improve overall well-being.',
          userId: users[0].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: `$100 Router Table`,
          photoURL: 'https://cdn.popularwoodworking.com/wp-content/uploads/2020/01/awrt50-e1615305217419.jpg',
          summary: 'As easy to use as it is to build.',
          description: 'Sometimes, less really is more. Take router tables for instance. It’s not at all difficult to ring up a $1000 tab for a manufactured router table, complete with a new router, loaded with convenience, durability, adjustability, and precision. But to me, the compelling thing about a router table is that it converts a portable power tool into a stationary power tool and thus expands its utility and versatility. A router table can be simple and quite inexpensive to make without sacrificing functionality. A basic table can be just as versatile, accurate and easy to use as one of those $1000 grandees but cost far less. I’ve just finished a $100 router table (excluding the router). I bought most of the materials and hardware at a local home center. There’s no router mounting plate to buy; the router attaches directly to the hinged top.',
          userId: users[0].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: 'Drill Press Table',
          photoURL: 'https://cdn.popularwoodworking.com/wp-content/uploads/2020/01/1204_3_drillpresstable_opener.jpg',
          summary: 'It’s accurate, easy to use and built to last.',
          description: 'There are all manner of drill press tables and fences, from a simple 2×4 clamped to the machine’s cast iron table to ones with gadgets and gizmos galore. The latter is not my style, so when the time came to replace my drill press table the list of requirements was short: Accuracy.The table must be flat and stay flat, and the fence must be square to the table. Ease of use.My prior table had a fence fixed to the table itself, so every fence adjustment required loosening and tightening F - style clamps to the irregular bottom of the cast iron table. Longevity.Though I tried not to, I eventually fouled my old table by drilling into it too many times. Workholding.There are times when I need to clamp down my work but normal clamps won’t reach. With these issues in mind, I developed the drill press table seen here.',
          userId: users[0].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: 'Texas Heritage Woodworks Saddle Bag',
          photoURL: 'https://cdn.popularwoodworking.com/wp-content/uploads/2020/07/saddlebag.jpg',
          summary: 'Beautify and handy, this saddle bag is built to last.',
          description: 'With 12 pockets of various sizes (from 1″-3″ in width and 3″-4″ in depth, including two pass-through pockets for longer tools such as combination squares) it easily handles miscellaneous items such as pencils, rulers, screwdrivers and squares, with plenty of room for tools that I use less often, including nail sets and countersinks. The leather-reinforced eyelets along the top of the Saddle Bag allow it to be mounted with four #6 screws. The double stitching and hand-peened copper rivets in the 14.7 ounce canvas (available in a range of colors) ensure its longevity.',
          userId: users[1].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: 'Knockdown Trestle Sawhorses',
          photoURL: 'https://cdn.popularwoodworking.com/wp-content/uploads/2020/01/aw_15635_007-e1603388139152.jpg',
          summary: 'Simple design. Sturdy Construction.',
          description: 'Every shop needs a pair of trusty sawhorses. I like ones that are easy to build and easy to store away. These sawhorses definitely fit that bill, and nest together quite well, too. This unique design is within reach of any woodworker and doesn’t require many tools to build. The wood is quite common—I used yellow poplar 1x4s from the local home center. You’ll need about 200 linear feet of 1x4s to make one pair of horses.',
          userId: users[1].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: 'Amish Rustic Shapely Bird House',
          photoURL: 'https://s3.dutchcrafters.com/product-images/600-600/pid_55347-Amish-Rustic-Smashed-Bird-Feeder--180.jpg',
          summary: 'Birds will flock to your backyard garden this summer with this unique hanging bird house!',
          description: "The curved design will make your birds feel comfy cozy in their new home.If you have any questions about this unique bird house, please get in touch! Our number is 1-555-555-2233, we would love to hear from you or stop by our store in the cloud. It's handcrafted by expert Amish woodworkers, which means it's built with attention to detail and just for you!",
          userId: users[1].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: 'Rustic Moon Garden Bird House',
          photoURL: 'https://s3.dutchcrafters.com/product-images/600-600/pid_51296-Amish-Made-Barkwood-Moon-Bird-Feeder--150.jpg',
          summary: 'Birds will flock to your backyard garden this summer with this unique hanging bird house!',
          description: 'With a classical design and signature woodworking, this endlessly charming moon bird house is the perfect addition to any bustling outdoor space. Its solid poly construction and metal roof promises season upon season of use, setting your garden up for years of beautiful birdsong.',
          userId: users[2].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: 'Amish Copper Roof Round Blue Birdhouse',
          photoURL: 'https://s3.dutchcrafters.com/product-images/600-600/pid_62043-Amish-Copper-Roof-Round-Blue-Birdhouse--160.jpg',
          summary: 'This beautiful copper roof birdhouse will be the centerpiece of our outdoor arrangement!',
          description: 'The Amish Copper Roof Round Blue Birdhouse is sure to shine in your backyard or garden. Bright copper colored roof with a round entry window for birds to come and visit. This birdhouse makes a lovely gift for the bird watcher in your family.',
          userId: users[2].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: 'Recycled Poly Wren Bird House',
          photoURL: 'https://s3.dutchcrafters.com/product-images/600-600/pid_66671-Recycled-Poly-Wren-Bird-House--30.jpg',
          summary: 'The Wren Bird House is available in three color combinations. The easy open lid makes it easy to refill.',
          description: 'Easy to use, colorful and durable, the Recycled Poly Wren Bird House is sure to attract some feathered friends. This eco friendly bird house is made with poly lumber that comes from recycled plastic. Poly outdoor furniture can withstand harsh weather conditions, resists rot and decay and is easy to maintain.',
          userId: users[2].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: 'Kennel Clad Dual Auto Locking Premium Insulated',
          photoURL: 'https://cdn11.bigcommerce.com/s-2sr6yqho63/images/stencil/553x553/products/13891/6886/KCDAL-PREM-INS-2__23221.1586121059.jpg',
          summary: 'Introducing the First & Only Auto Locking Guillotine Door!!!',
          description: `Security Boss is proud to introduce the world's first dual auto-locking guillotine kennel door. Engineered to provide the ultimate in insulation and security, these guillotine kennel doors save customers money and provide security for the kennel occupants. These doors are built to withstand abuse while providing the best insulation & security possible. The guillotine door features a 1" dense foam insulating core clad on both sides with 18 gauge aluminum sheets. The perimeter of the doors is framed with a reinforcing custom C-Channel that allows customers who have most previous kennel door versions to upgrade without new rails.`,
          userId: users[3].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: 'Kennel Clad Standard Guillotine Kennel Door',
          photoURL: 'https://cdn11.bigcommerce.com/s-2sr6yqho63/images/stencil/553x553/products/12339/6028/SB-KC-STD-2__36320.1586117519.jpg',
          summary: `The Kennel Clad Standard Doors are designed for customers looking for durable, long lasting, aesthetic kennel dog doors.`,
          description: `Security Boss is proud to offer the work horse model of the Kennel Clad Doors. The Standard Guillotine door is constructed of 1/16' thick aluminum plate, reinforced on all 4-sides with our customized aluminum channel. This simple, yet rugged design is a great alternative for those customers who are frustrated with the old white plastic guillotine doors that always appear dirty, and seem to have the look of of a 20 year old door after a few short weeks of use. The Standard will out perform any plastic door while providing you with a smart looking door that will retain it's appearance for many many years. All components are naturally rust resistant and can easily withstand frequent chemical exposure from repeated kennel washings.`,
          userId: users[3].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: 'MaxSeal Wall Mount Pet Door',
          photoURL: `https://cdn11.bigcommerce.com/s-2sr6yqho63/images/stencil/553x553/products/12124/5944/SB-MAXSEAL-WM-2__43946.1586117135.jpg`,
          summary: 'The MaxSeal Wall Model pet door is available in dual or single flap versions. The dual flap model is recommended for customers seeking an ultimate weather barrier for their home.',
          description: `The MaxSeal pet doors are the best sealing & insulating doors, as well as, the most secure when locked off. We often remark that the MaxSeal is the only door we would feel comfortable with in our home if we were on vacation, or away from home for any length of time. If you have had experience with any other pet door in the past, you will quickly see that the superior performing MaxSeal will pay for itself in energy savings, while providing the most security.`,
          userId: users[3].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: 'Custom MaxSeal French Door Pet Door',
          photoURL: `https://cdn11.bigcommerce.com/s-2sr6yqho63/images/stencil/553x553/products/12286/5999/SB-CUSTOM-FRENCH-2__78275.1586117414.jpg`,
          summary: 'These doors are of impeccable quality, rated to be among the best pet doors made. They provide a perfect seal and the best insulation.',
          description: `MaxSeal French Doors are made to order to fit the opening created by your existing panes of glass. You can replace one or more panes of glass to make room for a pet door. Some customers even will enlarge the opening by cutting into the side or footer of the door. The MaxSeal French doors can be removed at a later time to re-install the pane of glass if you wish (excluding those that cut into the door itself). All components of the pet door are replaceable so that your door can be maintained indefinitely.`,
          userId: users[4].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: `Autoslide Patio Pet Door System`,
          photoURL: `https://cdn11.bigcommerce.com/s-2sr6yqho63/images/stencil/553x553/products/12077/5914/AUTOSLIDE-2__94090.1586117037.jpg`,
          summary: `Motion Sensor, Collar Tag or Mat Activated Automatic Pet Door for Sliding Glass Doors`,
          description: `This Autoslide Patio Pet Door System can be activated by a motion sensor, RFID collar key fob or a mat sensor. This Autoslide works great for allowing pet and consumer access, just simply switch the modes between human or pet use! This Autoslide is recommended for customers who have pets constantly coming in and out, carrying supplies or do not have any hands free to open the sliding door, and the disabled or physically challenged. This Autoslide system is designed to be a universal fit, with DIY installation! This system can be installed on either the left or right side opening of sliding patio doors. This Autoslide is designed to be a universal fit for sliding patio doors, and even interior doors that slide from the side (cavity doors, pocket doors, sliding closet doors, etc). Once the Autoslide is installed, the smart technology is engineered to self-calibrate and memorize the opening widths This Autoslide features a quiet sliding operation, and low energy consumption.`,
          userId: users[4].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: `Giant Breed Patio Pet Door`,
          photoURL: `https://cdn11.bigcommerce.com/s-2sr6yqho63/images/stencil/553x553/products/13103/6368/SB-GIANT-SP-PPD-2__70981.1586119040.jpg`,
          summary: `Big Dog Patio Insert for Sliding Glass Doors`,
          description: `Security Boss Manufacturing LLC now offers a patio insert sized for extra large to giant breed dogs for sliding glass doors. This unit will fit any sliding door system from height ranges of 70 inches up to 99 inches. The generous pet opening is 15" inches wide x 28" inches high. You can choose between 4 various step over rise options to elevate the pet opening to the correct height for your dog. The rule to remember when sizing a pet opening for a dog is to allow 1.5-2" clearance above the dog's shoulders so that when the dog passes through the opening, they will not pinch the flap at the top. The step over rise should be easy to step over. It is always prudent to think of the dog's mobility as they age. Some breeds have more of a tendency for arthritis and hip problems.`,
          userId: users[4].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: "Print Gear Shift Box Cover",
          photoURL: "https://i.etsystatic.com/15747948/r/il/afa6c0/2944276200/il_794xN.2944276200_bxce.jpg",
          summary: "White Marble with Gold Print Gear Shift Box Cover Accessory for Wrangler JK",
          description: "FITS 2011-2018 Wrangler JK This item is for a custom overlay for your Jeep made of high quality and long-lasting materials.",
          userId: users[5].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: "Leather Journal",
          photoURL: "https://i.etsystatic.com/19821282/r/il/3a66d6/2974952974/il_794xN.2974952974_bj1a.jpg",
          summary: "Vintage Leather Notebook, Genuine Rustic Leather, Handmade Deckle Edge Paper",
          description: "Our unique unruled leather journal is made with 100% pure buffalo leather that will stand the test of time. The leather is meant to age, developing an even better feel and color. A proprietary oil tanning process is used to give the cover a vintage feel. Since we believe in using only natural leather, our products are truly unique and are destined for compliments.",
          userId: users[5].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: "4x4 Ford Mustang",
          photoURL: "https://i.pinimg.com/originals/fa/b7/35/fab735b9cedcaa075217f5e9958de0a1.jpg",
          summary: "Car Wheels Design Ford Mustangs custom car wheels chevy camaro.",
          description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
          userId: users[5].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: "Flannel Shirts",
          photoURL: "https://i.etsystatic.com/6087155/r/il/a23943/840997306/il_794xN.840997306_4pn0.jpg",
          summary: "Hand-distressed oversized shirts",
          description: "These repurposed flannel shirts are made to order & undergo a special distressing process to create the perfect worn-in look. To add character to your shirt, you can select the level of distress that you would prefer from the drop-down menu.",
          userId: users[6].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: "Custom Baby-boy Sleepwear",
          photoURL: "https://i.etsystatic.com/11032689/r/il/87d11a/2216185917/il_794xN.2216185917_i4zh.jpg",
          summary: "Newborn Boy Coming Home Outfit with Embroidered Monograms",
          description: "The picture shown places the first and middle names over the last initial. If you give us less than 3 names, please be clear in how you'd like the monograms. ONE name only for the hat. Please review the size chart before ordering. These sleepers run small.",
          userId: users[6].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: "Custom Baby-girl Sleepwear",
          photoURL: "https://i.etsystatic.com/11032689/r/il/bef724/1801304036/il_794xN.1801304036_7auc.jpg",
          summary: "Baby Girl Coming Home Outfit, Newborn Baby Girl, Baby Girl Gift",
          description: "Enter the baby's name and any special requests here:) For monogrammed items, we'd prefer the full name. Please note if we are given only three letters for the monogram, it will be stitched in the order given. ONE name only for the hat please!",
          userId: users[6].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: "Coyote fur boots for men",
          photoURL: "https://i.etsystatic.com/18669574/r/il/118bd0/2823082452/il_794xN.2823082452_4q8u.jpg",
          summary: "mukluks, viking boots, yeti boots, furry snow boots, winter boots",
          description: "Exclusive high fur boots from natural fur of coyote. These boots will take care of your feet up to 50 degrees Celcius below zero. They additionally insulated by a genuine sheepskin inside.",
          userId: users[7].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: "Black arctic Fox hat",
          photoURL: "https://i.etsystatic.com/18669574/r/il/633e12/2912525143/il_794xN.2912525143_jc5y.jpg",
          summary: "Men's leather aviator fox winter hat, Russian ushanka, Trapper hat",
          description: "Winter genuine leather ushanka with black arctic fox fur. Warmest winter hat! This extremely warm and comfortable hat will surely keep your head warm in cold winter and protect it from cold wind.",
          userId: users[7].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: "Fur winter boots for kids",
          photoURL: "https://i.etsystatic.com/18669574/r/il/454bd5/2622647915/il_794xN.2622647915_8od6.jpg",
          summary: "goat fur toddler boots, girls snow boots,big kids mukluks, yeti boots for kids, children winter shoe, children boots",
          description: "Interesting boots from natural color short-wool goat for little girls are available in different shades. Extra warm boots insulated by genuine sheepskin that withstand up to 50 degrees Celsius below zero. Only high quality materials are used, so this amazing boots will last your little girls for a long time!",
          userId: users[7].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: "Falcon Wood carving",
          photoURL: "https://i.etsystatic.com/10592261/r/il/9f1a52/732965061/il_794xN.732965061_b7bt.jpg",
          summary: "Handmade Woodcarving, 15,7 x 4,7 x 4,7 in",
          description: "Falcon woodcarving, handmade in one piece. Made in a native chilean wood called raulí (Nothofagus alpina). It measures 15,7 x 4,7 x 4,7 in. (40 x 12 x 12 cms.)",
          userId: users[8].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: "Owl Sculpture",
          photoURL: "https://i.etsystatic.com/28370901/r/il/23b4d2/2938409828/il_794xN.2938409828_d6c8.jpg",
          summary: "Wood carving. Wooden Owl Figurine. A perfect gift for a child or a girl.",
          description: "One of my favorite types of owls, it impresses with its magical appearance. The barn owl inspires me. Creating this sculpture by hand, I received positive emotions, I was happy, like a child, when the owl came to life in the process of making it.",
          userId: users[8].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: "Celtic Peacock Wood carving",
          photoURL: "https://i.etsystatic.com/10592261/r/il/d14cf7/2190412668/il_794xN.2190412668_bo41.jpg",
          summary: "Handmade Woodcarving, 9,8 x 6,2 in.",
          description: "Celtic woodcarving representing a Peacock with its feathers beautifully interlaced. Handarved in a native chilean wood called coihue (Nothofagus dombeyi). It measures 9,8 x 6,2 in. (25 x 16 cms.).",
          userId: users[8].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: "Glass Tiger Figurine",
          photoURL: "https://i.etsystatic.com/10592261/r/il/9f1a52/732965061/il_794xN.732965061_b7bt.jpg",
          summary: "Tiger Figurine Hand Blown Glass Gold Crystal Sculpture",
          description: "The unique attributes of this impressive animal are well represented in this hand crafted figurine. I make it entirely by hand from borosilicate crystal. The brilliant rainbow of colors is created when I apply pure gold to the glass while it is still molten.",
          userId: users[9].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: "Glass Dragon Serpent Figurine",
          photoURL: "https://i.etsystatic.com/6329281/r/il/0b1a1b/2248094575/il_794xN.2248094575_243y.jpg",
          summary: "Dragon Serpent Figurine Hand Blown Glass Crystal Ball",
          description: "This serpentine dragon, with its reflective scales and fiery red eyes is one of my favorite designs. I make the figurine entirely by hand of borosilicate crystal. The brilliant rainbow of colors is created when I apply pure gold to the glass while it is still molten.",
          userId: users[9].id,
          createdAt: faker.date.past(),
          updatedAt: new Date(),
        },
        {
          name: "Glass Grizzly Bear",
          photoURL: "https://i.etsystatic.com/6329281/r/il/0d8604/245059858/il_794xN.245059858.jpg",
          summary: "Bear Grizzly Hand Blown Glass Figurine Gold Black Bear",
          description: "Possessing all the characteristics of an inquisitive grizzly is this expressive hand crafted bear sculpture. I make the figurine entirely by hand of borosilicate crystal. The brilliant rainbow of colors is created when I apply pure gold to the glass while it is still molten. Bear is approximately 3.5 inches long and 2 inches tall. Sculpture is a must for every wildlife collector.",
          userId: users[9].id,
          createdAt: faker.date.past(),
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
            createdAt: faker.date.past(),
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
