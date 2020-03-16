import CategoryExceptions from "../../utils/exceptions/CategoryExceptions";
import * as Yup from 'yup';

class CategoryValidators {

  async validateCategoryYup(category) {
    const schema = Yup.object().shape({
      descricao: Yup.string()
        .required(),
      user_id: Yup
        .number()
        .required()
    });

    await schema
      .validate(category, { abortEarly: false })
      .catch(async err => {
        throw CategoryExceptions.CategoryValidationException(err.errors);
      });
  }

  async validateCategoryExists(category) {
    if (!category) {
      throw CategoryExceptions.CategoryNotFoundException();
    }
  }
}

export default new CategoryValidators();
