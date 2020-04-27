const { crearArchivo } = require("./multiplicar");

// Para que esto funcione hay que introducir en la terminal: node app --base=5
let argv = process.argv[2].split("=")[1];
let base = argv;

console.log(base);

crearArchivo(base)
  .then((archivo) => console.log(`Archivo creado con el nombre ${archivo}`))
  .catch((error) => console.log(error));
