const fetch = require('isomorphic-fetch');
const FormData = require('form-data');

const { ZOHO_AUTH, ZOHO_AUTH_INIT } = require('../../secrets');
const API_DOMAIN = 'https://accounts.zoho.com';
const API_URL = `${API_DOMAIN}/oauth/v2/token`;

const formData = new FormData();

const authToken = () => {
  for (let el in ZOHO_AUTH) {
    formData.append(el, ZOHO_AUTH[el]);
  }
  console.log(formData);
  return fetch(API_URL, {
    method: 'POST',
    body: formData,
    credentials: 'omit'
  })
    .then(res => res.json())
    .then(json => console.log(JSON.stringify(json)))
    .catch(error => console.log(error));
};

module.exports = { authToken };
