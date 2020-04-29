const axios = require("axios");

const getWheater = async (lat, lon) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2159bfaea1a3e0665d17f7d19f1cfdab&units=metric`
  );
  const data = response.data.main.temp;

  return data;
};

module.exports = {
  getWheater,
};
