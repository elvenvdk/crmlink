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
    // console.log(id ? 'fetchRecords' : 'no id yet');
    // console.log('fetchRecords', module);
    Zoho.setAuthForm({ module, id });
  }

  static createRecord({ module, body }) {
    // console.log('createRecord... body', JSON.stringify(body));
    Zoho.setAuthForm({ module: module, body: JSON.stringify(body) });
  }

  static updateRecord({ module, id, body }) {
    Zoho.setAuthForm({ module: module, id: id, body: JSON.stringify(body) });
  }

  static fetchFromAccount({ module, id, body, token, options }) {
    // console.log(id ? 'fetchFromAccount' : 'no id yet');
    // console.log(options ? options : 'no options yet');
    // console.log(options ? options : 'no options yet');
    // console.log('fetchFromAccount', module);
    if (id && body) {
      return fetch(`${REQ_URL}${module}/${id}`, options)
        .then(res => res.json())
        .then(json => console.log('RESPONSE', json))
        .catch(error => console.log('FUCK!  ERROR: ', error));
    }
    if (id) {
      return fetch(`${REQ_URL}${module}/${id}`, options)
        .then(res => res.json())
        .then(json => console.log('RESPONSE', json))
        .catch(error => console.log('FUCK!  ERROR: ', error));
    } else if (body) {
      console.log('body created and sent...');
      return fetch(`${REQ_URL}${module}`, options, body)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log('FUCK!  ERROR: ', error));
    } else {
      return fetch(`${REQ_URL}${module}`, options)
        .then(res => res.json())
        .then(json => console.log('RESPONSE', json))
        .catch(error => console.log('FUCK!  ERROR: ', error));
    }
  }

  static setAuthForm({ module, id, body }) {
    // console.log('setAuthForm... top body', body);
    for (let el in ZOHO_AUTH) {
      formData.append(el, ZOHO_AUTH[el]);
    }
    return fetch(ZOHO_API_URI, {
      method: 'POST',
      body: formData,
      credentials: 'omit'
    })
      .then(res => res.json())
      .then(res => {
        if (id && body) {
          console.log('updating record...');
          Zoho.updateModuleRecord({
            module: module,
            token: res.access_token,
            id: id,
            body: body
          });
        } else if (id) {
          Zoho.fetchModuleRecord({
            module: module,
            token: res.access_token,
            id: id
          });
        } else if (body) {
          // console.log('setAuthForm... body', body);
          Zoho.insertModuleRecord({
            module: module,
            token: res.access_token,
            body: body
          });
        } else {
          Zoho.fetchModuleRecords({
            module: module,
            token: res.access_token
          });
        }
      })
      .catch(error => console.log(error));
  }

  static fetchModuleRecords({ module, token }) {
    // console.log('fetchModuleRecords... header...', token);
    Zoho.fetchFromAccount({
      module: module,
      token: token,
      options: {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`
        }
      }
    });
  }

  static fetchModuleRecord({ module, id, token }) {
    // console.log('fetchModuleRecords... header...', token);
    Zoho.fetchFromAccount({
      module: module,
      id: id,
      token: token,
      options: {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`
        }
      }
    });
  }

  static insertModuleRecord({ module, token, body }) {
    console.log('insertModuleRecord... body', body);
    Zoho.fetchFromAccount({
      module: module,
      token: token,
      options: {
        method: 'POST',
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`
        },
        body: body
      }
    });
  }

  static insertModuleRecord({ module, token, body }) {
    console.log('insertModuleRecord... body', body);
    Zoho.fetchFromAccount({
      module: module,
      token: token,
      options: {
        method: 'PUT',
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`
        },
        body: body
      }
    });
  }

  static updateModuleRecord({ module, id, token, body }) {
    console.log('insertModuleRecord... body', body);
    console.log('insertModuleRecord... token', token);
    Zoho.fetchFromAccount({
      module: module,
      token: token,
      id: id,
      options: {
        method: 'PUT',
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`
        },
        body: body
      }
    });
  }
}

module.exports = Zoho;
