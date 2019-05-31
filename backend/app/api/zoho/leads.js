const { Router } = require('express');
const fetch = require('isomorphic-fetch');

const { authenticatedUser } = require('../user/helper');
const { getAccessToken, REQ_URL, modules } = require('./helper');
const router = new Router();
const IDsEqual = '?ids=';

const { LEADS } = modules;

// Leads
router.get('/', (req, res, next) => {
  let token;
  getAccessToken()
    .then(data => {
      token = data;
    })
    .catch(error => next(error));
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      fetch(`${REQ_URL}${LEADS}`, {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`
        }
      })
        .then(data => data.json())
        .then(json => res.send(json))
        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

// Specific Lead
router.get('/:id', (req, res, next) => {
  let token;
  const { id } = req.params;
  getAccessToken().then(data => {
    token = data;
  });
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      fetch(`${REQ_URL}${LEADS}/${id}`, {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`
        }
      })
        .then(data => data.json())
        .then(json => res.send(json))
        .catch(error => {
          throw error;
        })

        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

// Create lead
router.post('/create', (req, res, next) => {
  const {
    Last_Name,
    Title,
    Email,
    Company,
    Company_Description,
    Created_Date
  } = req.body;
  let token;
  getAccessToken()
    .then(data => {
      token = data;
    })
    .catch(error => next(error));
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      req.body = newLeadForm;
      console.log('newLeadForm', newLeadForm);
      fetch(`${REQ_URL}${LEADS}`, {
        method: 'POST',
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`
        },
        body: JSON.stringify({
          data: [
            {
              Last_Name,
              Title,
              Email,
              Company,
              Company_Description,
              Created_Date
            }
          ]
        })
      })
        .then(data => data.json())
        .then(json => {
          console.log(json);
          res.send(json);
        })
        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

// Update lead
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const {
    Last_Name,
    Title,
    Email,
    Company,
    Company_Description,
    Created_Date
  } = req.body;

  let token;
  getAccessToken().then(data => {
    token = data;
  });
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      req.body = newLeadForm;
      console.log('newLeadForm', newLeadForm);
      fetch(`${REQ_URL}${LEADS}`, {
        method: 'PUT',
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`
        },
        body: JSON.stringify({
          data: [
            {
              Last_Name,
              Title,
              Email,
              Company,
              Company_Description,
              Created_Date
            }
          ]
        })
      })
        .then(data => data.json())
        .then(json => {
          console.log(json);
          res.send(json);
        })
        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

module.exports = router;
