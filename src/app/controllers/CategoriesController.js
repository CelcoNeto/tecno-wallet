import CategoriesService from "../services/CategoriesService";
import HTTPSTATUS from "../../utils/HTTPSTATUS";

class CategoriasController {
  async showAll(req, res) {
    try {
      const categorys = await CategoriesService.index();
      return res.status(200).json(categorys);
    } catch (err) {
      const error = JSON.parse(err);
      return res.status(error.status).json(error);
    }
  }

  async show(req, res) {
    try {
      const params = {
        id: req.params.id,
        user_id: req.userId
      };

      const category = await CategoriesService.show(params);
      return res.status(HTTPSTATUS.OK).json(category);
    } catch (err) {
      const error = JSON.parse(err);
      return res.status(error.status).json(error);
    }
  }

  async store(req, res) {
    try {
      const category = await CategoriesService.store({
        ...req.body,
        user_id: req.userId
      });

      return res.status(HTTPSTATUS.CREATED).json(category);
    } catch (err) {
      const error = JSON.parse(err);
      return res.status(error.status).json(error);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoriesService.update(id, {
        ...req.body,
        user_id: req.userId
      });

      return res.status(HTTPSTATUS.OK).json(category);
    } catch (err) {
      const error = JSON.parse(err);
      return res.status(error.status).json(error);
    }
  }
}

export default new CategoriasController();
