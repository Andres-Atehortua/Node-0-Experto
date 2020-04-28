const argv = require("yargs")
  .options({
    direccion: {
      alias: "d",
      desc: "Dirección de la ciudad para obtener su clima",
      demand: true,
    },
  })
  .help().argv;

module.exports = argv;
