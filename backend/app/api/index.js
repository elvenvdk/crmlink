const { Router } = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const user = require('./user');
const zoho = require('./zoho');

const router = Router();

router.use(bodyParser.json());
router.use(cookieParser());

router.use('user', user);
router.use('/zo', zoho);

module.exports = router;
