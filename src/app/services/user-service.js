import { User } from "../models/user";
import { userValidators } from "../validators/user-validators";

class UserService {
  async store(user) {
    // await userValidators.validationStoreUser(user);
    // await userValidators.validadeIfEmailExists(user.email);
    const newUser = await User.create(user).catch((error) =>
      console.log(error)
    );
    console.log("NEW USER ->", newUser);
    const { id, name, email } = newUser;

    return {
      id,
      name,
      email,
    };
  }

  async update(user) {
    await userValidators.validationUpdateUser(user);

    const findedUser = await User.findByPk(user.id);

    const { id, name } = await findedUser.update(user);

    return {
      id,
      name,
    };
  }
}

export const userService = new UserService();
