const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errHandler } = require('./helper');

const userRouter = require('./api/user');

const app = express();

app.use(cors({ origin: 'http://localhost:1234', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/user', userRouter);

app.use(errHandler);

module.exports = app;
