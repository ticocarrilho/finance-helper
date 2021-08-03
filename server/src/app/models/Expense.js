
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: 'user',
      referencesKey: 'id'
    },
    card_id: {
      type: DataTypes.INTEGER,
      references: 'card',
      referencesKey: 'id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subscription: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    cost: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    installments: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    first_installment: {
      type: DataTypes.DATE,
      allowNull: true
    },
  });

  Expense.associate = function(models) {
    Expense.belongsTo(models.User, { foreignKey: 'user_id' });
    Expense.belongsTo(models.Card, { foreignKey: 'card_id' });
  }
  
  
  return Expense;
};