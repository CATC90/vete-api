const bcrypt = require('bcrypt-nodejs');

const encryptPassword = async password => {
  const result = await new Promise((resolve, reject) => {
    bcrypt.hash(password, null, null, function (err, hash) {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });

  return result;
};

const comparePassword = async (password, confirmPassword) => {
  const samePasswords = await new Promise((resolve, reject) => {
    bcrypt.compare(password, confirmPassword, function (err, confirm) {
      if (err) {
        reject(err);
      }
      resolve(confirm);
    });
  });

  return samePasswords;
};

module.exports = { encryptPassword, comparePassword };
