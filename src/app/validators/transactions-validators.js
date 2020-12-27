import * as Yup from "yup";
import { categoryExceptions } from "../../utils/exceptions/category-exceptions";
import { transactionsExceptions } from "../../utils/exceptions/transactions-exceptions";
import { userExceptions } from "../../utils/exceptions/user-exceptions";

class TransactionsValidators {
  async validationTransactionsShape(transactions) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      value: Yup.number().required(),
      category_id: Yup.number().required(),
      type: Yup.string().required(),
    });

    await schema
      .validate(transactions, { abortEarly: false })
      .catch(async (err) => {
        throw transactionsExceptions.transactionsException(err);
      });
  }

  async validationIfUserExists(user) {
    if (!user) {
      throw userExceptions.UserNotFoundException();
    }
  }

  async validationIfCategoryExists(category) {
    if (!category) {
      throw categoryExceptions.CategoryNotFoundException();
    }
  }
}

export const transactionsValidators = new TransactionsValidators();
