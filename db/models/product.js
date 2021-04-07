'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(60)
    },
    photoURL: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    summary: {
      allowNull: false,
      type: DataTypes.STRING(200)
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users'
      }
    },
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User, { foreignKey: 'userId' })
    Product.hasMany(models.Comment, {foreignKey: 'productId'})
  };
  return Product;
};
