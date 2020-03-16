import CategoryValidators from '../validators/CategoryValidators';
import Category from '../../app/models/Category';

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
    await CategoryValidators.validateCategoryYup(category);

    const { descricao } = await Category.create(category);

    return {
      descricao,
    };
  }

  async update(categoryId, categoryUpdate) {
    const category = await Category.findByPk(categoryId);

    await CategoryValidators.validateCategoryExists(category);
    await CategoryValidators.validateCategoryYup(categoryUpdate);

    await Category.update(categoryUpdate, {
      where: {
        id: categoryId,
        user_id: categoryUpdate.user_id,
      },
    });

    return category;
  }
}

export default new CategoriesService();
