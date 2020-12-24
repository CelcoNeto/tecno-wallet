import { Transactions } from '../models/transactions';
import { transactionsValidators } from '../validators/transactions-validators';

class TransactionsService {
  async store(transactions) {
    await transactionsValidators.validationTransactionsShape(transactions);

    const user = await User.findByPk(transactions.user_id);

    await transactionsValidators.validationIfUserExists(user);

    const category = await Category.findByPk(transactions.category_id);

    await transactionsValidators.validationIfCategoryExists(category);

    const {
      description,
      value,
      category_id,
      type,
      date,
    } = await Transactions.create(transactions);

    return {
      description,
      value,
      category_id,
      type,
      date,
    };
  }
}

export const transactionsService = new TransactionsService();
