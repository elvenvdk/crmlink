const uuid = require('uuid/v4');
const { hash } = require('../user/helper');

const SEPARATOR = '|';

// process cookies session
class Session {
  constructor({ username }) {
    this.username = username;
    this.id = uuid();
  }

  // parse session string
  static parse(sessionString) {
    const sessionData = sessionString.split(SEPARATOR);
    return {
      username: sessionData[0],
      id: sessionData[1],
      sessionHash: sessionData[2]
    };
  }

  // verify user session
  static verify(sessionString) {
    const { username, id, sessionHash } = Session.parse(sessionString);

    const userData = Session.userData({ username, id });

    return hash(userData) === sessionHash;
  }

  // convert username and id into sessionString
  toString() {
    const { username, id } = this;
    console.log(
      'toString sessionSTring',
      Session.sessionString({ username, id })
    );
    return Session.sessionString({ username, id });
  }

  // combine username and id as userData
  static userData({ username, id }) {
    console.log(`userData: ${username}${SEPARATOR}${id}`);
    return `${username}${SEPARATOR}${id}`;
  }

  // create a session string
  static sessionString({ username, id }) {
    const userData = Session.userData({ username, id });
    console.log(
      `from session string.. ${userData}${SEPARATOR}${hash(userData)}`
    );
    return `${userData}${SEPARATOR}${hash(userData)}`;
  }
}

module.exports = Session;
