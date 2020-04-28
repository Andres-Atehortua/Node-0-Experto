// Un callback es una función que se ejecuta después de que algo suceda.

// La función setTimeout recibe dos parámetos. El primero es un callback, en este caso un console.log()
// y el segundo es un número en milisegundos del tiempo que tiene que transcurrir para que se ejecute el
// callback
// setTimeout(() => console.log("Soy un callback"), 1000);

let getUserById = (id, callback) => {
  let user = {
    id,
    username: "Andrés",
  };
  id === 20
    ? callback(`El usuario con el id: ${id} no existe`)
    : callback(null, user);
};

getUserById(10, (err, user) => {
  if (err) return console.log(err);
  else console.log(`Usuario de la base de datos`, user);
});
