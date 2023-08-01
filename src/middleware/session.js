class AuthMiddleware {
  verifyAuth(allowedRoles) {
    return (req, res, next) => {
      if (req.session.status === undefined) {
        req.session.status = false;
      }

      if (req.session.status === true) {
        if (allowedRoles.includes(req.session.role)) {
          next();
        } else {
          res.status(403).send("Acceso prohibido: No tienes permiso para ver esta página.");
        }
      } else {
        res.redirect("/Login");
      }
    };
  }
}

module.exports = AuthMiddleware;