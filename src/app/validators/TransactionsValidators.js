import * as Yup from 'yup';
import UserExceptions from '../../utils/exceptions/UserExceptions';
import CategoryExceptions from '../../utils/exceptions/CategoryExceptions';
import TransactionsExceptions from '../../utils/exceptions/TransactionsExceptions';

class TransactionsValidators {
  async validationTransactionsShape(transactions) {
    const schema = Yup.object().shape({
      description: Yup.string()
        .required(),
      value: Yup.number().required(),
      category_id: Yup.number().required(),
      type: Yup.string().required(),
      date: Yup.date().required()
    });

    await schema
      .validate(transactions, { abortEarly: false })
      .catch(async err => {
        throw TransactionsExceptions.transactionsException(err);
      });
  }

  async validationIfUserExists(user) {
    if (!user) {
      throw UserExceptions.UserNotFoundException();
    }
  }

  async validationIfCategoryExists(category) {
    if (!category) {
      throw CategoryExceptions.CategoryNotFoundException();
    }
  }
}

export default new TransactionsValidators();
