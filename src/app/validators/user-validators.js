import * as Yup from 'yup';
import { userExceptions } from '../../utils/exceptions/user-exceptions';
import { User } from '../models/user';

class UserValidators {
  async validationStoreUser(user) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      confirmPassword: Yup.string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
    });

    await schema.validate(user, { abortEarly: false }).catch(async (err) => {
      throw userExceptions.UserStoreValidationException(err.errors);
    });
  }

  async validationUpdateUser(user) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
    });

    await schema.validate(user, { abortEarly: false }).catch(async (err) => {
      throw userExceptions.UserStoreValidationException(err.errors);
    });

    await this.validateUpdatedUserInformation(user);
  }

  async validadeIfEmailExists(email) {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      throw userExceptions.UserAlreadyExistsException(email);
    }
  }

  async validateUpdatedUserInformation(user) {
    const findedUser = await User.findByPk(user.id);

    this.validateIfUserExists(findedUser);

    await this.verifyIfEmailIsChanged(user, findedUser);

    const { oldPassword } = user;
    if (oldPassword) {
      await this.checkUserPassword(oldPassword, findedUser);
    }
  }

  validateIfUserExists(user) {
    if (!user) {
      throw userExceptions.UserNotFoundException();
    }
  }

  async verifyIfEmailIsChanged(user, findedUser) {
    if (user.email !== findedUser.email) {
      await this.validadeIfEmailExists(user.email);
    }
  }

  async checkUserPassword(oldPassword, findedUser) {
    if (!(await findedUser.checkPassword(oldPassword))) {
      throw userExceptions.PasswordDoesNotMatchException();
    }
  }
}

export const userValidators = new UserValidators();
