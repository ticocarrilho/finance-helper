module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    name: DataTypes.STRING,
    bank: DataTypes.STRING,
    limit: DataTypes.DECIMAL(12,2),
    close_day: DataTypes.INTEGER
  });

  Card.associate = function(models) {
    Card.belongsToMany(models.User, { through: models.UserCards });
    Card.hasMany(models.Expense, { foreignKey: 'card_id' });
  }

  return Card;
};
