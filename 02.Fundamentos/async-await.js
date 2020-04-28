// Async - Await vienen del ECMAScript 7
// Hace que el código sea más simple y fácil de mantener
// Async puede ir sólo pero Await tiene que estar dentro de una funcion Async

let getNombre = async () => {
  return "Andrés";
};

// Colocar la palabra async es como si hiciesemos esto:

// let getNombre = () => {
//   return new Promise((resolve, reject) => {
//     resolve("Andrés");
//   });
// };

// Por lo tanto al invocar la función tenemos acceso tanto al método .then() como .catch()

getNombre()
  .then((nombre) => console.log(nombre))
  .catch((error) => console.log("Error de async", error));

//-------------------------------------------------------------------------------------

let getNombre2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Juanito");
    }, 2000);
  });
};
getNombre2()
  .then((nombre) => console.log(nombre))
  .catch((error) => console.log(error));

let saludo = async () => {
  let nombre = await getNombre2();
  return `Hola ${nombre}`;
};

saludo()
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.log(error));
