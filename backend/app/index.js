const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { errHandler } = require('./helper');
const authToken = require('../bin/authToken/authToken');

const userRouter = require('./api/user');

const app = express();
dotenv.config();
app.use(cors({ origin: 'http://localhost:1234', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/user', userRouter);

app.use(errHandler);

authToken.generateAuthtoken();
authToken.refreshAuthToken();

module.exports = app;
