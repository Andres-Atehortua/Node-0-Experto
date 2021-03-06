// Configuración de yargs para introducir comandos en la consola que nosotros definimos.
// demand es la obligación de ponerlo. Alias es otra forma abreviada de escribirlo.
// default sirve para colocar un valor por defecto si el usuario no introduce uno.

const options = {
  base: {
    demand: true,
    alias: "b",
  },
  limite: {
    alias: "l",
    default: 10,
  },
};

const argv = require("yargs")
  .command("listar", "Imprime en consola la tabla de multiplicar", options)
  .command(
    "crear",
    "Genera un archivo con la tabla de multiplicar dándo una base y un límite",
    options
  )
  .help().argv;

module.exports = argv;
