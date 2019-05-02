const { Router } = require('express');
const UserTable = require('../../user/table');
const Session = require('../../auth/session');
const { hash, setSession, authenticatedUser } = require('../../auth/helper');

const router = Router();

// Signup
router.post('/register', (req, res, next) => {
  const { username, password } = req.body;
  const usernameHash = hash(username);
  const passwordHash = hash(password);

  UserTable.getUser({ usernameHash })
    .then(({ user }) => {
      if (!user) return UserTable.storeUser({ usernameHash, passwordHash });
      else {
        const error = new Error('This username has already been taken');
        error.status = 409;

        throw error;
      }
    })
    .then(() => {
      return setSession({ username, res });
    })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch(error => next(error));
});

module.exports = router;
