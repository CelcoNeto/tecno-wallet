import { Category } from "../models/category";
import { Transactions } from "../models/transactions";
import { User } from "../models/user";
import { transactionsValidators } from "../validators/transactions-validators";

class TransactionsService {
  async store(transaction) {
    await transactionsValidators.validationTransactionsShape(transaction);
    const user = await User.findByPk(transaction.user_id);
    await transactionsValidators.validationIfUserExists(user);
    const category = await Category.findByPk(transaction.category_id);
    await transactionsValidators.validationIfCategoryExists(category);
    const {
      description,
      value,
      category_id,
      type,
      date,
    } = await Transactions.create(transaction);

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
