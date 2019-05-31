const { Router } = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const reports = require('./reports');
const campaigns = require('./campaigns');
const audience = require('./audience');

const router = Router();

// MAILCHIMP

router.use(bodyParser.json());
router.use(cookieParser());

router.use('/reports', reports);
router.use('/campaigns', campaigns);
router.use('/audience', audience);

module.exports = router;
