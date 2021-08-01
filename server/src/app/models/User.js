const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: async (user) => {
        user.password = await bcrypt.hash(user.password, 8);
      },
    },
  });

  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: 600,
    });
  };

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
