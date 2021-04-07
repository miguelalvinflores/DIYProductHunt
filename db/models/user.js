'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    emailAddress: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    userName: {
      type: DataTypes.STRING(25),
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    profilePicURL: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    hashedPW: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Product, { foreignKey: 'userId' })
    User.hasMany(models.Comment, {foreignKey: 'userId'})
  };
  return User;
};
