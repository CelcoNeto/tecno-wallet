import app from '../../../src/app';
import User from '../../../src/app/models/User';
import UserService from '../../../src/app/services/UserService';

describe('User service', () => {
  it('when call user store with invalid user should throw yup error', async () => {
    const user = {};

    await UserService.store(user).catch((err) => {
      const error = JSON.parse(err);
      expect(error.status).toEqual(422);

      const { errors } = error;

      expect(errors.length).toEqual(3);
      expect(errors[0]).toEqual('name is a required field');
      expect(errors[1]).toEqual('email is a required field');
      expect(errors[2]).toEqual('password is a required field');
    })
  });

  it('when call user store with duplicate email throw error', async () => {
    await User.create({
      name: 'Dummy user',
      email: 'dummy@email.com',
      password: 'secret',
      confirmPassword: 'secret'
    });

    const user = {
      name: 'Dummy user',
      email: 'dummy@email.com',
      password: 'secret',
      confirmPassword: 'secret'
    };

    await UserService.store(user).catch((err) => {
      const error = JSON.parse(err);

      const { errors } = error;

      expect(error.status).toEqual(400);
      expect(errors[0]).toEqual('User with email dummy@email.com already exists.');
    })
  });

  it('when call user store should create new user', async () => {
    const user = {
      name: 'Dummy user right',
      email: 'dummy_right@email.com',
      password: 'secret',
      confirmPassword: 'secret'
    };

    const createdUser = await UserService.store(user);

    expect(createdUser).not.toBeNull();
    expect(createdUser.name).toEqual(user.name);
    expect(createdUser.email).toEqual(user.email);
  });

  it('when call user update with oldPassword and without password should return yup error', async () => {

    const oldUser = await User.create({
      name: 'Dummy user',
      email: 'dummy_update@email.com',
      password: 'secret',
      confirmPassword: 'secret'
    });

    const user = {
      id: oldUser.id,
      name: 'Dummy user right',
      email: 'dummy_update@email.com',
      oldPassword: 'secret'
    };

    await UserService.update(user).catch((err) => {
      const error = JSON.parse(err);
      expect(error.status).toEqual(422);

      const { errors } = error;

      expect(errors.length).toEqual(1);
      expect(errors[0]).toEqual('password is a required field');
    });
  });

  it('when call user update with oldPassword and password without confirmPassword should return yup error', async () => {

    const oldUser = await User.create({
      name: 'Dummy user',
      email: 'dummy_update2@email.com',
      password: 'secret',
      confirmPassword: 'secret'
    });

    const user = {
      id: oldUser.id,
      name: 'Dummy user right',
      email: 'dummy_update@email.com',
      oldPassword: 'secret',
      password: 'secret1'
    };

    await UserService.update(user).catch((err) => {
      const error = JSON.parse(err);
      expect(error.status).toEqual(422);

      const { errors } = error;

      expect(errors.length).toEqual(1);
      expect(errors[0]).toEqual('confirmPassword is a required field');
    });
  });

  it('when call user update with invalid id should thorw validation error', async () => {

    await User.create({
      name: 'Dummy user',
      email: 'dummy_invalidId@email.com',
      password: 'secret',
      confirmPassword: 'secret'
    });

    const user = {
      id: 9999,
      name: 'Dummy user right',
      email: 'dummy_invalidId@email.com',
      oldPassword: 'secret',
      password: 'secret1',
      confirmPassword: 'secret1'
    };

    await UserService.update(user).catch((err) => {
      const error = JSON.parse(err);

      expect(error.status).toEqual(400);

      const { errors } = error;

      expect(errors.length).toEqual(1);
      expect(errors[0]).toEqual('User not found.');
    });
  });

  it('when call user update with duplicate email throw error', async () => {
    await User.create({
      name: 'Dummy user',
      email: 'dummy_duplicated_email@email.com',
      password: 'secret',
      confirmPassword: 'secret'
    });

    const createdUser = await User.create({
      name: 'Dummy user',
      email: 'dummy_normal@email.com',
      password: 'secret',
      confirmPassword: 'secret'
    });

    const user = {
      id: createdUser.id,
      name: 'Dummy user',
      email: 'dummy_duplicated_email@email.com',
      password: 'secret',
      confirmPassword: 'secret'
    };

    await UserService.update(user).catch((err) => {
      const error = JSON.parse(err);

      const { errors } = error;

      expect(error.status).toEqual(400);
      expect(errors[0]).toEqual('User with email dummy_duplicated_email@email.com already exists.');
    })
  });

  it('when call user update should update user information', async () => {
    const oldUser = await User.create({
      name: 'Dummy user updated',
      email: 'dummy_right_update@email.com',
      password: 'secret',
      confirmPassword: 'secret'
    });

    const user = {
      id: oldUser.id,
      name: 'Dummy user updated',
      email: 'dummy_updated@email.com',
      oldPassword: 'secret',
      password: 'secret123',
      confirmPassword: 'secret123'
    };

    const updatedUser = await UserService.update(user);

    expect(updatedUser).not.toBeNull();
    expect(updatedUser.name).toEqual(user.name);
  });

});
