import Transactions from '../models/Transactions';
import TransactionsValidators from '../validators/TransactionsValidators';
import User from '../models/User';
import Category from '../models/Category';

class TransactionsService {
  async store(transactions) {

    await TransactionsValidators.validationTransactionsShape(transactions);

    const user = await User.findByPk(transactions.user_id);

    await TransactionsValidators.validationIfUserExists(user);

    const category = await Category.findByPk(transactions.category_id);

    await TransactionsValidators.validationIfCategoryExists(category);

    const {
      description,
      value,
      category_id,
      type,
      date
    } = await Transactions.create(transactions);

    return {
      description,
      value,
      category_id,
      type,
      date
    }
  }
}

export default new TransactionsService();
