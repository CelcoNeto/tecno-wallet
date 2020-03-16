import User from "../../../src/app/models/User";

describe("User.js", () => {
  beforeAll(async () => {
    await User.create({
      name: "Dummy Email",
      email: "dummy_email@email.com",
      password: "secret"
    });
  });

  it("When call checkPassword from User.js should return false", async () => {
    const findedUser = await User.findOne({
      where: { email: "dummy_email@email.com" }
    });
    const isEqualPassword = await findedUser.checkPassword("123");

    expect(isEqualPassword).toBeFalsy();
  });

  it("When call checkPassword from User.js should return true", async () => {
    const findedUser = await User.findOne({
      where: { email: "dummy_email@email.com" }
    });

    const isEqualPassword = await findedUser.checkPassword("secret");

    expect(isEqualPassword).toBeTruthy();
  });

  afterAll(async () => {
    await User.destroy({ where: { email: "dummy_email@email.com" } });
  });
});
