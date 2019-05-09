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
  static fetchRcords(module) {
    Zoho.setAuthForm(module);
  }

  static setAuthForm(module) {
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
        if (module === LEADS) Zoho.fetchLeads(res.access_token);
        else if (module === DEALS) Zoho.fetchDeals(res.access_token);
        else if (module === REFERRALS) Zoho.fetchReferrals(res.access_token);
        else if (module === CONTACTS) Zoho.fetchContacts(res.access_token);
        else if (module === CAMPAIGNS) Zoho.fetchCampaigns(res.access_token);
        else if (module === TASKS) Zoho.fetchTasks(res.access_token);
        else if (module === ACTIVITIES) Zoho.fetchActivities(res.access_token);
        else if (module === ACCOUNTS) Zoho.fetchAccounts(res.access_token);
      })
      .catch(error => console.log(error));
  }

  // Leads
  static fetchLeads(token) {
    console.log('leads header...', token);
    return fetch(`${REQ_URL}${LEADS}`, {
      method: 'GET',
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`
      }
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  }

  // Deals
  static fetchDeals(token) {
    console.log('deals header...', token);
    return fetch(`${REQ_URL}${DEALS}`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`
      }
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  }

  // Referrals
  static fetchReferrals(token) {
    console.log('referrals header...', token);
    return fetch(`${REQ_URL}${REFERRALS}`, {
      headers: {
        Authorization: `Zoho-oauthtoken${token}`
      }
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  }

  // Contacts
  static fetchContacts(token) {
    console.log('contacts header...', token);
    return fetch(`${REQ_URL}${CONTACTS}`, {
      headers: {
        Authorization: `Zoho-oauthtoken${token}`
      }
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  }

  // Referrals
  static fetchCampaigns(token) {
    console.log('campaigns header...', token);
    return fetch(`${REQ_URL}${CAMPAIGNS}`, {
      headers: {
        Authorization: `Zoho-oauthtoken${token}`
      }
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  }

  // Tasks
  static fetchTasks(token) {
    console.log('tasks header...', token);
    return fetch(`${REQ_URL}${TASKS}`, {
      headers: {
        Authorization: `Zoho-oauthtoken${token}`
      }
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  }

  // Activities
  static fetchActivities(token) {
    console.log('activities header...', token);
    return fetch(`${REQ_URL}${ACTIVITIES}`, {
      headers: {
        Authorization: `Zoho-oauthtoken${token}`
      }
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  }

  // Accounts
  static fetchAccounts(token) {
    console.log('accounts header...', token);
    return fetch(`${REQ_URL}${ACCOUNTS}`, {
      headers: {
        Authorization: `Zoho-oauthtoken${token}`
      }
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  }
}

module.exports = Zoho;
