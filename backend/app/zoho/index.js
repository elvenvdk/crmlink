const fetch = require('isomorphic-fetch');
const FormData = require('form-data');

const formData = new FormData();

const { ZOHO_AUTH } = require('../../secrets');
const { modules } = require('./helper');

const ZOHO_API_DOMAIN = 'https://accounts.zoho.com';
const ZOHO_API_URI = `${ZOHO_API_DOMAIN}/oauth/v2/token`;

const REQ_URL = 'https://www.zohoapis.com/crm/v2/';
const REFRESH_TIME = 3300000;
const {
  LEADS,
  CONTACTS,
  CAMPAIGNS,
  DEALS,
  TASKS,
  REFERRALS,
  ACTIVITIES,
  ACCOUNTS
} = modules;

class Zoho {
  static fetchRcords({ module, id }) {
    console.log(id ? 'fetchRecords' : 'no id yet');
    Zoho.setAuthForm(module, id);
  }

  static fetchFromAccount({ module, id, token, options }) {
    console.log(id ? 'fetchFromAccount' : 'no id yet');
    options = {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`
      }
    };
    if (id) {
      return fetch(`${REQ_URL}${module}/${id}`, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log(error));
    } else {
      return fetch(`${REQ_URL}${module}`, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log(error));
    }
  }

  static setAuthForm(module, id) {
    for (let el in ZOHO_AUTH) {
      formData.append(el, ZOHO_AUTH[el]);
    }
    if (id) {
      console.log('setAuthform... id', id);
      return fetch(ZOHO_API_URI, {
        method: 'POST',
        body: formData,
        credentials: 'omit'
      })
        .then(res => res.json())
        .then(res => {
          console.log('.then setAuthForm... id', id);
          Zoho.fetchModuleRecord({
            module: module,
            token: res.access_token,
            id: id
          });
        })
        .catch(error => console.log(error));
    } else {
      return fetch(ZOHO_API_URI, {
        method: 'POST',
        body: formData,
        credentials: 'omit'
      })
        .then(res => res.json())
        .then(res => {
          Zoho.fetchModuleRecords({
            module: module,
            token: res.access_token
          });
        })
        .catch(error => console.log(error));
    }
  }

  static fetchModuleRecords({ module, token }) {
    console.log('fetchModuleRecords... header...', token);
    Zoho.fetchFromAccount({
      module: module,
      token: token,
      options: {
        method: 'GET'
      }
    });
  }

  static fetchModuleRecord({ module, id, token }) {
    console.log('fetchModuleRecords... header...', token);
    Zoho.fetchFromAccount({
      module: module,
      id: id,
      token: token,
      options: {
        method: 'GET'
      }
    });
  }
}

module.exports = Zoho;
