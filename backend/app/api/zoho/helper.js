const FormData = require('form-data');
const { ZOHO_AUTH } = require('../../../secrets');

const pool = require('../../../databasePool');
const formData = new FormData();

const ZOHO_API_DOMAIN = 'https://accounts.zoho.com';
const ZOHO_API_URI = `${ZOHO_API_DOMAIN}/oauth/v2/token`;
const REQ_URL = 'https://www.zohoapis.com/crm/v2/';

const date = new Date();
const newLeadForm = {
  Which_membership_club_s_if_applicable: null,
  Owner: {
    name: 'Shimite Obialo',
    id: '2354620000000112007'
  },
  Company: null,
  Interested_in_Anoko_House_Membership: null,
  Email: null,
  $currency_symbol: null,
  Would_you_like_to_participate_in_focus_group: null,
  Company_Description1: null,
  Birthday: null,
  How_often_do_you_eat_out: null,
  Resume_Portfolio: null,
  Last_Activity_Time: null,
  Where_do_you_live: null,
  Have_you_ever_purchased_fine_art_before: null,
  What_can_you_contribute_to_the_Anoko_community: [],
  $converted: false,
  $process_flow: false,
  Lead_Category: [],
  Work_Phone: null,
  Street: null,
  Zip_Code: null,
  Executive_Summary: null,
  id: null,
  Facebook: null,
  $approved: true,
  $approval: {
    delegate: false,
    approve: false,
    reject: false,
    resubmit: false
  },
  Created_Time: `${date.getFullYear()}-0${date.getMonth()}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}+05:00`,
  Multi_Select_11: [],
  $editable: true,
  City: null,
  Where_do_you_work: null,
  High_Quality_Headshot: null,
  Instagram: null,
  Have_previously_attended_an_Anoko_event: null,
  Secondary_Email: null,
  Profession_2: null,
  Inspiration: null,
  What_would_you_like_to_get_out_of_Anoko_membership: null,
  Place_Where_Met_Lead: null,
  Description: null,
  Twitter: null,
  Website: null,
  How_often_do_attend_art_events: null,
  Travel_Desires: null,
  Salutation: null,
  First_Name: null,
  Lead_Status: null,
  Full_Name: null,
  Record_Image: null,
  Which_Anoko_events_have_attended_if_applicable: [],
  Most_import_factor_in_attending_events: null,
  Best_way_to_contact: [],
  Email_Opt_Out: false,
  Age: null,
  Designation: null,
  Pitch_Deck: null,
  Modified_Time: null,
  Industry_Category: [],
  $converted_detail: {},
  Bio: null,
  General_thoughts_about_Anoko: null,
  How_did_you_hear_about_us: [],
  Company_2: null,
  VIP_Perks_Preference: [],
  Mobile: null,
  Ever_been_member_of_paid_private_club_ie_Soho: null,
  LinkedIn_Profile: null,
  How_would_use_the_Anoko_House_if_interested: [],
  Current_City: null,
  Last_Name: null,
  Anoko_Member_Segment: [],
  Tag: [
    {
      name: null,
      id: null
    }
  ],
  Passions_Hobbies: null,
  What_kind_of_events_are_you_most_interested_in: []
};

const modules = {
  LEADS: 'leads',
  CONTACTS: 'contacts',
  CAMPAIGNS: 'campaigns',
  DEALS: 'deals',
  TASKS: 'tasks',
  REFERRALS: 'referrals',
  ACTIVITIES: 'activities',
  ACCOUNTS: 'accounts'
};

const REFRESH_TIME = 3300000;

const getTimeStr = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthZero = month < 10 ? '0' : '';
  const day = date.getDate();
  const dayZero = day < 10 ? '0' : '';
  const hrs = date.getHours();
  const hrsZero = hrs < 10 ? '0' : '';
  const mins = date.getMinutes();
  const minsZero = mins < 10 ? '0' : '';
  const secs = date.getSeconds();
  const secsZero = secs < 10 ? '0' : '';
  const milliSecs = date.getMilliseconds();
  const timeStr = `${year}-${monthZero}${month}${dayZero}-${day} ${hrsZero}${hrs}:${minsZero}${mins}:${secsZero}${secs}.${milliSecs}`;
  return timeStr;
};

let on = false;

// Main authentication
const authenticate = () => {
  on = true;
  console.log('authenicating');
  for (let el in ZOHO_AUTH) {
    formData.append(el, ZOHO_AUTH[el]);
  }
  return fetch(ZOHO_API_URI, {
    method: 'POST',
    body: formData,
    credentials: 'omit'
  })
    .then(data => data.json())
    .then(data => {
      // console.log('GETTING ACCESS TOKEN', data.access_token);
      pool.query('DELETE FROM zoho_session', (error, response) => {
        if (error) {
          throw error;
        }
      });
      pool.query(
        `INSERT INTO zoho_session(session_id) VALUES($1)`,
        [data.access_token],
        (error, response) => {
          if (error) {
            throw error;
          }
        }
      );
    });
};

const authenticated = () => on;

let timer;

const refreshAuth = () => {
  console.log('Starting AuthToken refresh...');
  let time = 0;
  timer = setInterval(() => {
    console.log('Refreshing AuthToken - Refresh No: ', time++);
    authenticate();
  }, REFRESH_TIME);
};

const stopRefreshAuth = () => {
  console.log('Refresh AuthToken Stopped');
  clearInterval(timer);
};

const getAccessToken = () => {
  console.log(on);
  // if (on) {
  //   return new Promise((resolve, reject) => {
  //     pool.query('SELECT * FROM zoho_session', (error, response) => {
  //       if (error) {
  //         return reject(error.message);
  //       } else if (response.rows[0] !== undefined) {
  //         resolve(response.rows[0].session_id);
  //       } else {
  //         console.log('shit...');
  //       }
  //     });
  //   });
  // } else {
  //   console.log('UserError: ...User not logged in');
  // }

  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM zoho_session', (error, response) => {
      if (error) {
        return reject(error.message);
      } else if (response.rows[0] !== undefined) {
        resolve(response.rows[0].session_id);
      } else {
        console.log('shit...');
      }
    });
  });
};

module.exports = {
  authenticate,
  authenticated,
  getAccessToken,
  newLeadForm,
  modules,
  refreshAuth,
  stopRefreshAuth,
  REQ_URL
};
