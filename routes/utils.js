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

function requireAdmin(req, res, next) {
  if (!req.user) {
    return next({
      name: "AuthorizationError",
      message: "You must log in to complete this action!",
    });
  } else if (!req.user.isAdmin) {
    return next({
      name: "AdminAuthorizationError",
      message: "You must have admin permissions to complete this action!",
    });
  } else {
    next();
  }
}

module.exports = { requireUser, requireAdmin };
