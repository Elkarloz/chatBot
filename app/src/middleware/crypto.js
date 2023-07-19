const bcrypt = require("bcrypt");
const saltRounds = 10;

class Crypto {
  async encrypt(password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  async verify(password, encrypted) {
    const isCorrect = bcrypt.compareSync(password, encrypted);
    return isCorrect;
  }
}

module.exports = new Crypto();
