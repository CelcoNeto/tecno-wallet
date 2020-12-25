import { Category } from "../models/category";
import { categoryValidators } from "../validators/category-validators";

class CategoriesService {
  async index() {
    const categorys = await Category.findAll();
    return categorys;
  }

  async show({ id, user_id }) {
    return await Category.findOne({
      where: {
        id,
        user_id,
      },
    });
  }

  async store(category) {
    await categoryValidators.validateCategoryYup(category);
    const { description } = await Category.create(category);

    return {
      description,
    };
  }

  async update(categoryId, categoryUpdate) {
    const category = await Category.findByPk(categoryId);

    await categoryValidators.validateCategoryExists(category);
    await categoryValidators.validateCategoryYup(categoryUpdate);

    await Category.update(categoryUpdate, {
      where: {
        id: categoryId,
        user_id: categoryUpdate.user_id,
      },
    });

    return category;
  }
}

export const categoriesService = new CategoriesService();
