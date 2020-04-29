const axios = require("axios");

// Gestión normal de promesas con .then, .catch

// const getLatLng = (place) => {
//   const encodedURL = encodeURI(place);

//   const instance = axios.create({
//     baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedURL}`,
//     headers: {
//       "X-RapidAPI-Key": "c9193e237bmshe9703bf09bd9605p1abc67jsn0fbe5b30a1c9",
//     },
//   });

//   instance
//     .get()
//     .then((response) => console.log(response.data.Results[0]))
//     .catch((err) => console.log(err));
// };

// Con async - await

const getLatLng = async (place) => {
  const encodedURL = encodeURI(place);

  const instance = axios.create({
    baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedURL}`,
    headers: {
      "X-RapidAPI-Key": "c9193e237bmshe9703bf09bd9605p1abc67jsn0fbe5b30a1c9",
    },
  });

  const response = await instance.get();
  const data = response.data.Results;

  if (data.length === 0)
    throw new Error(`No se han encontrado resultados para ${place}`);
  else {
    let { name: direction, lat, lon } = data[0];
    return {
      direction,
      lat,
      lon,
    };
  }
};

module.exports = {
  getLatLng,
};
