const { Router } = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const leads = require('./leads');

const router = Router();

router.use(bodyParser.json());
router.use(cookieParser());

router.use('/leads', leads);

module.exports = router;
