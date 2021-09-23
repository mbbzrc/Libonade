const apiRouter = require("express").Router();

const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/users");
const { JWT_SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById({ id });
        next();
      } else {
        next({
          name: "InvalidTokenError",
          message: "This token is not valid or has expired.",
        });
      }
    } catch (error) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use("/stories", require("./stories"));

apiRouter.use("/questions", require("./questions"));

apiRouter.use("/words", require("./words"));

apiRouter.use("/users", require("./users"));

apiRouter.use("/userStories", require("./userStories"));

module.exports = apiRouter;
