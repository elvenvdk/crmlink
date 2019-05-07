const fetch = require('isomorphic-fetch');
const FormData = require('form-data');

const { ZOHO_AUTH } = require('../../secrets');
const ZOHO_API_DOMAIN = 'https://accounts.zoho.com';
const ZOHO_API_URI = `${ZOHO_API_DOMAIN}/oauth/v2/token`;
const formData = new FormData();

class AuthToken {
  static setAuthForm(uri, data) {
    for (let el in data) {
      formData.append(el, data[el]);
    }
    return fetch(uri, {
      method: 'POST',
      body: formData,
      credentials: 'omit'
    })
      .then(res => res.json())
      .then(res => {
        res.api_domain
          ? console.log(`Connected to ZOHO APIs at: ${res.api_domain}`)
          : console.log(`Connected to Mailchimp API`);
      })
      .catch(error => console.log(error));
  }

  static generateZohoAuth() {
    AuthToken.setAuthForm(ZOHO_API_URI, ZOHO_AUTH);
  }

  static refreshZohoAuth() {
    return setTimeout(() => {
      generateZohoAuth();
    }, 3540000);
  }
}

module.exports = AuthToken;
