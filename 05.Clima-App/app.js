const argv = require("./config/yargs.config");
require("dotenv").config();
const { getLatLng } = require("./services/place.service");
const { getWheater } = require("./services/wheater.service");

// PARA EJECUTAR LA APLICACION ESCRIBIMOS EN LA CONSOLA: node app -d <ciudad>

// getLatLng(argv.direccion).then(console.log);
// getWheater(40.75, -74.0).then(console.log).catch(console.log);

const getInfo = async (city) => {
  try {
    const cityInfo = await getLatLng(city);
    let { lat, lon, direction } = cityInfo;
    const weatherInfo = await getWheater(lat, lon);
    return `La temperatura para la ciudad ${direction} es de ${weatherInfo}°C.`;
  } catch (error) {
    // console.log("Error", error);
    return `No se ha podido obtener la información para la ciudad ${city}`;
  }
};

getInfo(argv.direccion).then(console.log).catch(console.log);
