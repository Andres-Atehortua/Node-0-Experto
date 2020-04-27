const argv = require("./config/yargs.config");

const { crearArchivo, listarTabla } = require("./multiplicar");

// Para que esta configuración manual funcione hay que introducir en la terminal: node app --base=5
// let argv = process.argv[2].split("=")[1];
// let base = argv;

// Utilizando la configuracion de yargs podemos ahora introducir: node app listar -b 5
// o también: node app listar --base 5. De esta forma accedemos al valor con argv.base o argv.b

let comando = argv._[0];

switch (comando) {
  case "listar":
    listarTabla(argv.base, argv.limite);
    break;
  case "crear":
    crearArchivo(argv.base, argv.limite)
      .then((archivo) => console.log(`Archivo creado con el nombre ${archivo}`))
      .catch((error) => console.log(error));
    break;
  default:
    console.log("Comando no reconocido");
    break;
}
