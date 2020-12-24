import { CREATED } from '../../utils/HTTPSTATUS';
import { File } from '../models/file';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({ name, path });
    return res.status(CREATED).json(file);
  }
}

export const fileController = new FileController();
