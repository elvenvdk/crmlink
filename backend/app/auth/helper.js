const SHA256 = require('crypto-js/sha256');

const { APP_SECRET } = require('../../secrets');
const Session = require('./session');
const UserTable = require('../user/table');

// create string hash
const hash = str => SHA256(`${APP_SECRET}${str}${APP_SECRET}`).toString();

// set session
const setSession = ({ username, res, sessionId }) => {
  return new Promise((resolve, reject) => {
    let session, sessionString;

    if (sessionId) {
      sessionString = Session.sessionString({ username, id: sessionId });

      setSessionCookie({ sessionString });

      resolve({ message: 'Session restored' });
    } else {
      session = new Session({ username });
      sessionString = session.toString();

      UserTable.updateSessionId({
        sessionId: session.id,
        usernameHash: hash(username)
      })
        .then(() => {
          setSessionCookie({ sessionString, res });
          resolve({ message: 'Session created' });
        })
        .catch(error => reject(error));
    }
  });
};

// set session cookies
const setSessionCookie = ({ sessionString, res }) => {
  res.cookie('sessionString', sessionString, {
    expire: Date.now() + 3600000,
    httpOnly: true
    // secure: true / Should be used with HTTPS (make sure to setup)
  });
};

// create authenticated account
const authenticatedUser = ({ sessionString }) => {
  return new Promise((resolve, reject) => {
    if (!sessionString || !Session.verify(sessionString)) {
      const error = new Error('Invalid Session');

      error.statusCode = 400;

      return reject(error);
    } else {
      const { username, id } = Session.parse(sessionString);

      UserTable.getUser({ usernameHash: hash(username) })
        .then(({ user }) => {
          const authenticated = user.session_id === id;

          resolve({ user, authenticated });
        })
        .catch(error => reject(error));
    }
  });
};

module.exports = { hash, setSession, authenticatedUser };
