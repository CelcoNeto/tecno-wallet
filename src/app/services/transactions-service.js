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

  _transactionFilter = (transaction, type) => transaction.type === type;
  _reducer = (accumulator, payment) => accumulator + payment.value;

  async resume() {
    const transactions = await this._findAllTransactions();
    const payments = this._searchTransaction(transactions, "PAGAMENTO");
    const deposits = this._searchTransaction(transactions, "RECEBIMENTO");

    const movimentations = this._buildMovimentationObject(transactions);

    const resume = {
      saldoTotal: deposits - payments,
      movimentacoes: movimentations,
    };
    return resume;
  }

  async _findAllTransactions() {
    const transactions = await Transactions.findAll({
      include: [{ model: Category, attributes: ["id", "description"] }],
      attributes: ["id", "type", "value", "description", "created_at"],
    });
    return transactions;
  }

  _buildMovimentationObject(transactions) {
    return transactions.map((transaction) => ({
      data: transaction._previousDataValues.created_at,
      id: transaction.id,
      type: transaction.type,
      categoria: transaction.Category,
      valor: transaction.value,
      descricao: transaction.description,
    }));
  }
  _searchTransaction(transactions, type) {
    return transactions
      .filter((transaction) => this._transactionFilter(transaction, type))
      .reduce(this._reducer, 0);
  }
}

export const transactionsService = new TransactionsService();
