import { CREATED } from "../../utils/HTTPSTATUS";
import { File } from "../models/file";

class FileController {
  async store(req, res) {
    try {
      const { originalname: name, filename: path } = req.file;
      const file = await File.create({ name, path });
      return res.status(CREATED).json(file);
    } catch (error) {
      const { status, errors } = JSON.parse(error);
      return res.status(status).json({ errors });
    }
  }
}

export const fileController = new FileController();
