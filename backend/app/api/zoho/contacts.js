const { Router } = require('express');
const fetch = require('isomorphic-fetch');

const { authenticatedUser } = require('../user/helper');
const { modules } = require('./helper');
const { getAccessToken, REQ_URL } = require('./helper');

const router = Router();
const IDisEqual = '?ids=';

const { CONTACTS } = modules;

// Contacts
router.get('/', (req, res, next) => {
  let token;
  getAccessToken()
    .then(data => {
      token = data;
    })
    .catch(error => next(error));
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      fetch(`${REQ_URL}${CONTACTS}`, {
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

// Specific Contact
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  let token;
  getAccessToken()
    .then(data => {
      token = data;
    })
    .catch(error => next(error));
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      fetch(`${REQ_URL}${CONTACTS}/${id}`, {
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

// Create Contact
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
      fetch(`${REQ_URL}${CONTACTS}`, {
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

// Update Contact
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
      fetch(`${REQ_URL}${CONTACTS}`, {
        method: 'PUT',
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`
        },
        body: JSON.stringify({
          data: [
            {
              id,
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
