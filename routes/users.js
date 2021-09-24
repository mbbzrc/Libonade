const usersRouter = require("express").Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const { hash } = require("bcrypt");
const saltRounds = 10;

const { createUser, getUserByUsername } = require("../db");

usersRouter.post("/register", async (req, res, next) => {
  try {
    let { username, password, email } = req.body;

    const _user = await getUserByUsername({ username });
    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with this username already exists.",
      });
    }

    const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (password.search(passwordRegExp) === -1) {
      next({
        name: "InvalidPasswordError",
        message:
          "Invalid password. Password must be at least 8 characters in length and contain at least one number, one uppercase, and one lowercase letter.",
      });
    }

    password = await hash(password, saltRounds);

    console.log("HASH ", password);

    const user = await createUser({ username, password, email });

    const token = jwt.sign(
      { id: user["id"], username: user["username"] },
      JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    res.send({ message: "Your account has been created!", user, token });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
