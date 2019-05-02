const uuid = require('uuid/v4');
const { hash } = require('./helper');

const SEPARATOR = '|';

// process cookies session
class Session {
  constructor({ username }) {
    this.username = username;
    this.uuid = uuid();
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
    return Session.sessionString({ username, id });
  }

  // combine username and id as userData
  static userData({ username, id }) {
    return `${username}${SEPARATOR}${id}`;
  }

  // create a session string
  static sessionString({ username, id }) {
    const userData = Session.userData({ username, id });

    return `${userData}${SEPARATOR}${hash(userData)}`;
  }
}

module.exports = Session;
