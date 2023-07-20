class AuthMiddleware {
  async verifyAuth(req, res, next) {
    if (req.session.status === undefined) {
      req.session.status = false;
    }
    if (req.session.status === true) {
      next();
    } else {
      res.redirect("/Login");
    }
  }
}

module.exports = AuthMiddleware;
