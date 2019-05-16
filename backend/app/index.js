const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { errHandler } = require('./helper');
const {
  authenticate,
  refreshAuth,
  stopRefreshAuth,
  authenticated
} = require('./api/zoho/helper');

const routes = require('./api');

const app = express();
dotenv.config();

app.use(cors({ origin: 'http://localhost:1234', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', routes);

app.use(errHandler);

// authenticate();
// console.log('authenticated() from index', authenticated());

// Zoho.fetchRcords({
//   module: 'activities',
//   id: '2354620000008692064',
//   type: 'fetchMany'
// });
// Zoho.fetchRcords({ module: 'contacts' });
// Zoho.updateRecord({
//   module: 'contacts',
//   id: '2354620000009920001',
//   body: {
//     data: [
//       {
//         First_Name: 'Olafunke',
//         Last_Name: 'Adeyemi',
//         Email: 'olafunke.adeyemi@email.com',
//         Description:
//           'This was a test to see if I could create a record from the api...'
//       }
//     ]
//   }
// });

module.exports = app;
