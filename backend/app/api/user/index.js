const { Router } = require('express');
const UserTable = require('../../user/table');
const Session = require('../../user/session');
const { setSession, authenticatedUser } = require('./helper');
const {
  authenticate,
  refreshAuth,
  stopRefreshAuth
} = require('../zoho/helper');
const { hash } = require('../../user/helper');

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

// Login
router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  UserTable.getUser({ usernameHash: hash(username) })
    .then(({ user }) => {
      if (user && user.password_hash === hash(password)) {
        const { session_id } = user;
        authenticate();
        refreshAuth();
        return setSession({ username, res, session_id });
      } else {
        const error = new Error('Incorrect username/password');
        error.statusCode = 409;
        throw error;
      }
    })
    .then(({ message }) => res.json(message))
    .catch(error => next(error));
});

// Logout
router.get('/logout', (req, res, next) => {
  stopRefreshAuth();
  const { username } = Session.parse(req.cookies.sessionString);

  UserTable.updateSessionId({
    sessionId: null,
    usernameHash: hash(username)
  })
    .then(() => {
      res.clearCookie('sessionString');
      res.json({ message: 'Successfully Logged Out' });
    })
    .catch(error => next(error));
});

// Authenticated
router.get('/authenticated', (req, res, next) => {
  const { sessionString } = req.cookies;

  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(({ authenticated }) => res.json({ authenticated }))
    .catch(error => next(error));
});

module.exports = router;
