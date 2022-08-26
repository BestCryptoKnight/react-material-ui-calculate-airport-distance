const express = require('express');
const axios = require('axios');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();




// Endpoint

const API = `api`;

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'APC-Auth': '8a9a502349',
    'APC-Auth-Secret': 'd2ba3373bf2bef8'
  }
};

app.get(`/${API}/airports`, async (req, res) => {
  const { term } = req.query;

  // API call with params we requested from client app

  // Sending response for client
  try {
    const response = await axios.post(
      `https://www.air-port-codes.com/api/v1/multi?term=${term}`,
      null,
      axiosConfig
    );
    await res.json(response.data);
  } catch (err) {
    await res.json(err);
  }
});

app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
})