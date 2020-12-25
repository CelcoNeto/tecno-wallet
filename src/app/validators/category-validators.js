import * as Yup from "yup";
import { categoryExceptions } from "../../utils/exceptions/category-exceptions";

class CategoryValidators {
  async validateCategoryYup(category) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      user_id: Yup.number().required(),
    });

    await schema
      .validate(category, { abortEarly: false })
      .catch(async (err) => {
        throw categoryExceptions.CategoryValidationException(err.errors);
      });
  }

  async validateCategoryExists(category) {
    if (!category) {
      throw categoryExceptions.CategoryNotFoundException();
    }
  }
}

export const categoryValidators = new CategoryValidators();
