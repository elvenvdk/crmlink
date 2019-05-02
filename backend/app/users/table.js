const pool = require('../../databasePool');

class UserTable {
  static storeUser({ usernameHash, passwordHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO users(username_hash, password_hash)
          VALUES ($1, $2)`,
        [usernameHash, passwordHash],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }
}
