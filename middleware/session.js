class AuthMiddleware {
  async verifyAuth(req, res, next) {
    if (req.session.status === true) {
      next();
    } else {
      res.redirect("/");
    }
  }
}

module.exports = AuthMiddleware;
