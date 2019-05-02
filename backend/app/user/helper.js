const SHA256 = require('crypto-js/sha256');

const { APP_SECRET } = require('../../secrets');

// create string hash
const hash = str => SHA256(`${APP_SECRET}${str}${APP_SECRET}`).toString();

module.exports = { hash };
