const { Router } = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const memberId = require('./memberId');
const memberApplication = require('./memberApplication');

const router = Router();

router.use(bodyParser.json());
router.use(cookieParser());

router.use('/identification', memberId);
router.use('/application', memberApplication);

module.exports = router;
