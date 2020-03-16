import app from "../../../src/app";
import Categories from "../../../src/app/models/Category";

import request from "supertest";

describe("Categories Controller", function() {
  beforeAll(async () => {
    await Categories.create({
      descricao: "Faculdade test"
    });
  });

  it("when call categories store with invalid user should return yup error", async () => {
    const category = {};

    request(app)
      .post("/api/categories")
      .send(category)
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
