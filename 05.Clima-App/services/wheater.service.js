const axios = require("axios");

const getWheater = async (lat, lon) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_WEATHER}=metric`
  );
  const data = response.data.main.temp;

  return data;
};

module.exports = {
  getWheater,
};
