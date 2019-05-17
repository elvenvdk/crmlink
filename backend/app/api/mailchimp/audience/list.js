const { Router } = require('express');
const fetch = require('isomorphic-fetch');
const { authenticatedUser } = require('../../user/helper');

const { MAILCHIMPAUTHTOKEN } = require('../../../../secrets');

const router = Router();

const REQ_URL = 'https://us12.api.mailchimp.com/3.0/lists/0eae1569fb';

// CAMPAIAGNS
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

module.exports = router;
