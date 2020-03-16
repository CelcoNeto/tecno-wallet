import app from "../../../src/app";
import User from "../../../src/app/models/User";

import request from "supertest";

describe("User Controller", function() {
  beforeAll(async () => {
    await User.create({
      name: "Dummy user",
      email: "dummy_update_controller@email.com",
      password: "secret",
      confirmPassword: "secret"
    });
  });

  it("when call user store with invalid user should return yup error", async () => {
    const user = {};

    request(app)
      .post("/api/users")
      .send(user)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(422)
      .expect({
        status: 422,
        errors: [
          "name is a required field",
          "email is a required field",
          "password is a required field"
        ]
      });
  });

  it("when call user store with duplicate email return error", async () => {
    const user = {
      name: "Dummy user",
      email: "dummy_update_controller@email.com",
      password: "secret",
      confirmPassword: "secret"
    };

    request(app)
      .post("/api/users")
      .send(user)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect({
        status: 400,
        errors: ["User with email dummy@email.com already exists."]
      });
  });

  it("when call user store should create new user", async () => {
    const user = {
      name: "Dummy user right",
      email: "dummy_right_controller@email.com",
      password: "secret",
      confirmPassword: "secret"
    };

    await request(app)
      .post("/api/users")
      .send(user)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);

    const createdUser = await User.findOne({ where: { email: user.email } });

    expect(createdUser).not.toBeNull();
    expect(createdUser.name).toEqual(user.name);
    expect(createdUser.email).toEqual(user.email);
  });
});
