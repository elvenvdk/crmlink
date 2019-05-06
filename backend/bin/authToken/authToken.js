const fetch = require('isomorphic-fetch');
const FormData = require('form-data');

const { ZOHO_AUTH } = require('../../secrets');
const API_DOMAIN = 'https://accounts.zoho.com';
const API_URL = `${API_DOMAIN}/oauth/v2/token`;

const formData = new FormData();

class authToken {
  static generateAuthtoken() {
    for (let el in ZOHO_AUTH) {
      formData.append(el, ZOHO_AUTH[el]);
    }
    return fetch(API_URL, {
      method: 'POST',
      body: formData,
      credentials: 'omit'
    })
      .then(res => res.json())
      .then(res => console.log(`Connected to ZOHO APIs at: ${res.api_domain}`))
      .catch(error => console.log(error));
  }

  static refreshAuthToken() {
    return setTimeout(() => {
      generateAuthtoken();
    }, 3540000);
  }
}

module.exports = authToken;
