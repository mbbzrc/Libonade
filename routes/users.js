const usersRouter = require("express").Router();

const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const { hash, genSalt, compare } = require("bcrypt");

const {
  createUser,
  getUserByUsername,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../db");
const { requireUser, requireAdmin } = require("./utils");

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, email, isAdmin = false } = req.body;

    const _user = await getUserByUsername({ username });
    if (_user) {
      return next({
        name: "UserExistsError",
        message: "A user with this username already exists.",
      });
    }

    const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (password.search(passwordRegExp) === -1) {
      return next({
        name: "InvalidPasswordError",
        message:
          "Invalid password. Password must be at least 8 characters in length and contain at least one number, one uppercase, and one lowercase letter.",
      });
    }

    const salt = await genSalt();
    hashedPassword = await hash(password, salt);

    const user = await createUser({
      username,
      password: hashedPassword,
      email,
      isAdmin,
    });

    const token = sign(
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

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByUsername({ username });

    if (!user) {
      return next({
        name: "InvalidUsernameError",
        message: "This username has not been registered.",
      });
    }

    if (await compare(password, user["password"])) {
      delete user["password"];
    } else {
      return next({
        name: "InvalidPasswordError",
        message: "Password is incorrect. Please try again.",
      });
    }

    const token = sign(
      { id: user["id"], username: user["username"] },
      JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.send({ message: "Login successful. Welcome back!", user, token });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/account", requireUser, async (req, res, next) => {
  try {
    const { username } = req.user;
    const user = await getUserByUsername({ username });

    if (user) {
      delete user["password"];
    } else {
      return next({
        name: "FetchUserError",
        message: "User data is not available. Please exit and log in again.",
      });
    }

    res.send({ user });
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/account", requireUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const { username, password, email, isAdmin } = req.body;
    let updateFields = { id };
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (isAdmin) updateFields.isAdmin = isAdmin;
    if (password) {
      const salt = await genSalt();
      const hashedPassword = await hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await updateUser(updateFields);

    const updated = Object.keys(updateFields);
    updated.shift();

    res.send({
      message: `Successfully updated: ${updated.join(", ")}.`,
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/account", requireUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const deletedUser = await deleteUser({ id });

    res.send({ message: "Account successfully deleted.", deletedUser });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/admin/all", requireAdmin, async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/admin/:username", requireAdmin, async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await getUserByUsername({ username });
    delete user.password;

    if (!user) {
      return next({
        name: "NoUserAdminError",
        message: "No user registered with this username.",
      });
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/admin", requireAdmin, async (req, res, next) => {
  try {
    const { id, username, password, email, isAdmin } = req.body;
    let updateFields = { id };
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (isAdmin) updateFields.isAdmin = isAdmin;
    if (password) {
      const salt = await genSalt();
      const hashedPassword = await hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await updateUser(updateFields);

    const updated = Object.keys(updateFields);
    updated.shift();

    res.send({
      message: `Successfully updated user ${username}'s ${updated.join(", ")}.`,
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/admin", requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.body;
    const deletedUser = await deleteUser({ id });

    res.send({
      message: `User ${deletedUser["username"]}'s account has been successfully deleted.`,
      deletedUser,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
