const { Router } = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const leads = require('./leads');
const contacts = require('./contacts');
const referrals = require('./referrals');
const campaigns = require('./campaigns');
const deals = require('./deals');
const accounts = require('./accounts');
const activities = require('./activities');
const tasks = require('./tasks');

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

// ZOHO
router.use(`/${LEADS}`, leads);
router.use(`/${CONTACTS}`, contacts);
router.use(`/${REFERRALS}`, referrals);
router.use(`/${CAMPAIGNS}`, campaigns);
router.use(`/${ACCOUNTS}`, accounts);
router.use(`/${ACTIVITIES}`, activities);
router.use(`/${DEALS}`, deals);
router.use(`/${TASKS}`, tasks);

module.exports = router;
