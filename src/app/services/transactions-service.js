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

  _paymentsFilter = (transaction) => transaction.type === "PAGAMENTO";
  _receivementsFilter = (transaction) => transaction.type === "RECEBIMENTO";
  _reducer = (accumulator, payment) => accumulator + payment.value;

  async resume() {
    const transactions = await Transactions.findAll();
    const payments = transactions
      .filter(this._paymentsFilter)
      .reduce(this._reducer, 0);
    const deposits = transactions
      .filter(this._receivementsFilter)
      .reduce(this._reducer, 0);
    const resume = {
      deposits,
      value_of_payments: payments,
      total_balance: deposits - payments,
      movements_of_the_day: transactions.length,
    };
    return resume;
  }
}

export const transactionsService = new TransactionsService();
