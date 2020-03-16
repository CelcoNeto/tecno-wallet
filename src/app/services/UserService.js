import User from '../models/User';
import UserValidators from '../validators/UserValidators';

class UserService {
  async store(user) {
    await UserValidators.validationStoreUser(user);
    await UserValidators.validadeIfEmailExists(user.email);

    const newUser = await User.create(user);

    const { id, name, email } = newUser;

    return {
      id,
      name,
      email,
    };
  }

  async update(user) {
    await UserValidators.validationUpdateUser(user);

    const findedUser = await User.findByPk(user.id);

    const { id, name } = await findedUser.update(user);

    return {
      id,
      name,
    };
  }
}

export default new UserService();
