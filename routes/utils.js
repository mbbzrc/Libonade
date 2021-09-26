function requireUser(req, res, next) {
  if (!req.user) {
    return next({
      name: "AuthorizationError",
      message: "You must log in to complete this action!",
    });
  } else {
    next();
  }
}

module.exports = { requireUser };
