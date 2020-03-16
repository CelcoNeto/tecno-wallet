import Sequelize, { Model } from 'sequelize';

class Transactions extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        category_id: Sequelize.INTEGER,
        description: Sequelize.STRING,
        value: Sequelize.FLOAT,
        type: Sequelize.ENUM(['RECEBIMENTO', 'PAGAMENTO']),
        date: Sequelize.DATE,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Category, { foreignKey: 'category_id' });
  }
}
export default Transactions;
