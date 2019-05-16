const { Router } = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const leads = require('./leads');
const contacts = require('./contacts');
const referrals = require('./referrals');

const { modules } = require('./helper');
const {
  ACCOUNTS,
  ACTIVITIES,
  CAMPAIGNS,
  CONTACTS,
  DEALS,
  LEADS,
  REFERRALS,
  TASKS
} = modules;

const router = Router();

router.use(bodyParser.json());
router.use(cookieParser());

router.use(`/${LEADS}`, leads);
router.use(`/${CONTACTS}`, contacts);
router.use(`/${REFERRALS}`, referrals);

module.exports = router;
