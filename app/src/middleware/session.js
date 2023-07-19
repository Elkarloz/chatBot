class AuthMiddleware {
  async verifyAuth(req, res, next) {
    if (req.session.status === true) {
      next();
    } else {
      res.status(401).redirect("/Login");
    }
  }
}

module.exports = AuthMiddleware;
