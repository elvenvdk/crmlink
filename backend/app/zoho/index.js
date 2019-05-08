const fetch = require('isomorphic-fetch');
const FormData = require('form-data');

const formData = new FormData();

const { ZOHO_AUTH } = require('../../secrets');
const { modules } = require('./helper');

const ZOHO_API_DOMAIN = 'https://accounts.zoho.com';
const ZOHO_API_URI = `${ZOHO_API_DOMAIN}/oauth/v2/token`;

const REQ_URL = 'https://www.zohoapis.com/crm/v2/';
const REFRESH_TIME = 3300000;
const { LEADS, CONTACTS, CAMPAIGNS } = modules;

class Zoho {
  // Sets formdata and make postrequest
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
        console.log(`Connected to ZOHO APIs at: ${res.api_domain}`);
        Zoho.setHeaders.headers = res.access_token;
      })
      .catch(error => console.log(error));
  }

  // Generatges the oauth
  static generateZohoAuth() {
    Zoho.setAuthForm(ZOHO_API_URI, ZOHO_AUTH);
  }

  // Gets the authToken for header
  static setHeaders() {
    return (headers = {
      authToken: ''
    });
  }

  // Refreshes oauth ever 55 mins
  static refreshZohoAuth() {
    return setTimeout(() => {
      generateZohoAuth();
    }, REFRESH_TIME);
  }

  // Leads
  static getLeads() {
    return fetch(`${REQ_URL}${LEADS}`, {
      method: 'GET',
      headers: {
        Authorization: `Zoho-oauthtoken ${Zoho.setHeaders.headers}`
      }
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  }

  // Contacts
  static getContacts() {
    return fetch();
  }
}

module.exports = Zoho;
