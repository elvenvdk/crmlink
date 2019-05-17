const { Router } = require('express');
const fetch = require('isomorphic-fetch');
const { authenticatedUser } = require('../user/helper');

const { MAILCHIMPAUTHTOKEN } = require('../../../secrets');

const router = Router();

const REQ_URL = 'https://us12.api.mailchimp.com/3.0/lists/';

// AUDIENCE
router.get('/', (req, res, next) => {
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      fetch(`${REQ_URL}`, {
        headers: {
          Authorization: MAILCHIMPAUTHTOKEN
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

// Audience List
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      fetch(`${REQ_URL}/${id}`, {
        headers: {
          Authorization: MAILCHIMPAUTHTOKEN
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

// Audience List Members
router.get('/members/:id', (req, res, next) => {
  const { id } = req.params;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      fetch(`${REQ_URL}/${id}/members`, {
        headers: {
          Authorization: MAILCHIMPAUTHTOKEN
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

// Audience List Specific Member
router.get('/members/:id/:memberId', (req, res, next) => {
  const { id, memberId } = req.params;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      fetch(`${REQ_URL}/${id}/members/${memberId}`, {
        headers: {
          Authorization: MAILCHIMPAUTHTOKEN
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

module.exports = router;
