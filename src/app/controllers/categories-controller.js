import { CREATED, OK } from '../../utils/HTTPSTATUS';
import { categoriesService } from '../services/categories-service';

class CategoriesController {
  async showAll(req, res) {
    try {
      const categorys = await categoriesService.index();
      return res.status(OK).json(categorys);
    } catch (error) {
      const errorMessage = JSON.parse(error);
      return res.status(error.status).json(errorMessage);
    }
  }

  async show(req, res) {
    try {
      const params = {
        id: req.params.id,
        user_id: req.userId,
      };

      const category = await categoriesService.show(params);
      return res.status(OK).json(category);
    } catch (error) {
      const errorMessage = JSON.parse(error);
      return res.status(error.status).json(errorMessage);
    }
  }

  async store(req, res) {
    try {
      const category = await categoriesService.store({
        ...req.body,
        user_id: req.userId,
      });

      return res.status(CREATED).json(category);
    } catch (error) {
      const errorMessage = JSON.parse(error);
      return res.status(error.status).json(errorMessage);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const category = await categoriesService.update(id, {
        ...req.body,
        user_id: req.userId,
      });

      return res.status(OK).json(category);
    } catch (error) {
      const errorMessage = JSON.parse(error);
      return res.status(error.status).json(errorMessage);
    }
  }
}

export const categoriesController = new CategoriesController();
