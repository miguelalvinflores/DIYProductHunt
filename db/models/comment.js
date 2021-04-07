'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING(280),
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    wasEdited: DataTypes.BOOLEAN
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Product, {foreignKey: "productId"})
    Comment.belongsTo(models.User, {foreignKey: "userId"})
  };
  return Comment;
};
