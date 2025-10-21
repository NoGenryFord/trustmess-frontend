import 'axios';
import { JSON_SERVER_API } from '.env';

const axios = require('axios');
const API = JSON_SERVER_API;
// Endpoints
// users list -> users

// * Test GET request
axios({
  method: 'get',
  url: API + users,
});

// const axios = require('axios');
// POST
// GET
// UPDATE
// DELITE
