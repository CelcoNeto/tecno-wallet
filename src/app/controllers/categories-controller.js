import { CREATED, OK } from "../../utils/HTTPSTATUS";
import { categoriesService } from "../services/categories-service";

class CategoriesController {
  async showAll(req, res) {
    try {
      const categorys = await categoriesService.index();
      return res.status(OK).json(categorys);
    } catch (error) {
      const { status, errors } = JSON.parse(error);
      return res.status(status).json({ errors });
    }
  }

  async show(req, res) {
    try {
      const params = {
        id: req.params.id,
      };

      const category = await categoriesService.show(params);
      return res.status(OK).json(category);
    } catch (error) {
      const { status, errors } = JSON.parse(error);
      return res.status(status).json({ errors });
    }
  }

  async store(req, res) {
    try {
      const category = await categoriesService.store(req.body);

      return res.status(CREATED).json(category);
    } catch (error) {
      const { status, errors } = JSON.parse(error);
      return res.status(status).json({ errors });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const category = await categoriesService.update(id, req.body);

      return res.status(OK).json(category);
    } catch (error) {
      const { status, errors } = JSON.parse(error);
      return res.status(status).json({ errors });
    }
  }
}

export const categoriesController = new CategoriesController();
