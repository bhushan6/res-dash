import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/",
  timeout: 10000,
  headers: { Authorization: `Bearer keyfXgn8PL6pB3x32` },
});
