const request = require("supertest");
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");

const ctrl = require("../../controllers/auth");
const { User } = require("../../models/user");

const dotenv = require("dotenv");

dotenv.config();

const { DB_HOST, JWT_SECRET } = process.env;

const app = express();
app.use(express.json());
app.post("/api/auth/signin", ctrl.signin);

const user = {
  email: "testuser@gmail.com",
  password: "qwerty12345",
  subscription: "starter",
};

describe("test: signin controller", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen();
  });
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("test response status", async () => {
    const res = await request(app).post("/api/auth/signin").send(user);
    expect(res.status).toBe(200);
  });

  test("test response if body includes token", async () => {
    const res = await request(app).post("/api/auth/signin").send(user);
    expect(res.body).toHaveProperty("token");

    const { token } = res.body;
    expect(typeof token).toBe("string");
    expect(() => jwt.verify(token, JWT_SECRET).not.toThrow(Error));
  });

  test("test response body includes user", async () => {
    const signupData = {
      email: user.email,
      subscription: user.subscription,
    };
    const response = await request(app)
      .post("/api/auth/signin")
      .send(signupData);

    const { body } = response;
    expect(body.subscription).toBe(signupData.subscription);
    expect(body.email).toBe(signupData.email);

    expect(typeof body.email).toBe("string");
    expect(typeof body.subscription).toBe("string");

    // const testUser = await User.findOne({ email: user.email });
    // expect(testUser.email).toBe(user.email);
  });
});
