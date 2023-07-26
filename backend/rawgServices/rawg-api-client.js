const axios = require("axios");
// const config = require("config");

const rawgApi = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: process.env.RAWG_API_KEY,
  },
  Headers: {
    "Content-Type": "application/json",
  },
});

module.exports = rawgApi;
