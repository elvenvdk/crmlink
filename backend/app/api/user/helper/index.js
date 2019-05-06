const Session = require('../../../user/session');
const UserTable = require('../../../user/table');
const { hash } = require('../../../user/helper');

const setSession = ({ username, res, session_id }) => {
  return new Promise((resolve, reject) => {
    let session, sessionString;

    if (session_id) {
      sessionString = Session.sessionString({ username, id: session_id });

      setSessionCookie({ sessionString, res });

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
          resolve({ message: 'Session was created ' });
        })
        .catch(error => reject(error));
    }
  });
};

const setSessionCookie = ({ sessionString, res }) => {
  res.cookie('sessionString', sessionString, {
    expire: Date.now() + 3600000,
    httpOnly: true
    // secure: true / should be used with HTTPS (make sure to set up)
  });
};

const authenticatedUser = ({ sessionString }) => {
  return new Promise((resolve, reject) => {
    if (!sessionString || !Session.verify(sessionString)) {
      const error = new Error('Invalid session');

      error.statusCode = 400;

      return reject(error);
    } else {
      const { username, id } = Session.parse(sessionString);

      UserTable.getUser({ usernameHash: hash(username) })
        .then(({ user }) => {
          const authenticated = user.session_id == id;

          resolve({ account, authenticated });
        })
        .catch(error => reject(error));
    }
  });
};

module.exports = { setSession, authenticatedUser };
