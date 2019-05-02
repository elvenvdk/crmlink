const pool = require('../../databasePool');

class UserTable {
  static storeUser({ usernameHash, passwordHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO crm_user(username_hash, password_hash)
          VALUES ($1, $2)`,
        [usernameHash, passwordHash],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static getUser({ usernameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, password_hash, session_id
          FROM crm_user
          WHERE username_hash = $1`,
        [usernameHash],
        (error, response) => {
          if (error) return reject(error);
          resolve({ user: response.rows[0] });
        }
      );
    });
  }

  static updateSessionId({ sessionId, usernameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE crm_user
          SET session_id = $1
          WHERE username_hash = $2`,
        [sessionId, usernameHash],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static deleteUser({ usernameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE from crm_user
          WHERE username_hash = $1`,
        [usernameHash],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }
}

module.exports = UserTable;
