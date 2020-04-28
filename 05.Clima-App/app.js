const axios = require("axios");
const argv = require("./config/yargs.config");

let encodedURL = encodeURI(argv.direccion);
console.log(encodedURL);

const instance = axios.create({
  baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedURL}`,
  headers: {
    "X-RapidAPI-Key": "c9193e237bmshe9703bf09bd9605p1abc67jsn0fbe5b30a1c9",
  },
});

instance
  .get()
  .then((response) => console.log(response.data.Results[0]))
  .catch((err) => console.log(err));
