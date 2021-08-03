module.exports = (sequelize, DataTypes) => {
  const UserCards = sequelize.define('UserCards', {
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
  });

  return UserCards;
};
