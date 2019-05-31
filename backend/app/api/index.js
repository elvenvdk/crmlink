const { Router } = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const user = require('./user');
const zoho = require('./zoho');
const mailchimp = require('./mailchimp');
const members = require('./member');

const router = Router();

router.use(bodyParser.json());
router.use(cookieParser());

// app user
router.use('/user', user);
// mailchimp routes
router.use('/machi', mailchimp);
// zoho routes
router.use('/zo', zoho);
// anoko members
router.use('/members', members);

module.exports = router;
