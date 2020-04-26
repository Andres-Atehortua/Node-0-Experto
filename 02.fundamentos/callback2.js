let empleados = [
  {
    id: 1,
    name: "Andrés",
  },
  {
    id: 2,
    name: "Julia",
  },
  {
    id: 3,
    name: "Óscar",
  },
];

let salarios = [
  {
    id: 1,
    salario: 1000,
  },
  {
    id: 2,
    salario: 2000,
  },
];

let getEmpleadoById = (id, cb) => {
  let empleadoDB = empleados.find((empleado) => empleado.id === id);
  !empleadoDB
    ? cb(`No existe ningún empleado con el id: ${id}`)
    : cb(null, empleadoDB);
};

let getSalarioByEmpleado = (empleado, cb) => {
  let salarioDB = salarios.find((salario) => salario.id === empleado.id);
  !salarioDB
    ? cb(`No existe salario para el empleado: ${empleado.name}`)
    : cb(null, {
        nombre: empleado.name,
        salario: salarioDB.salario,
        id: empleado.id,
      });
};

// Esta es la máxima anidación que se debería hacer para no caer en el callback hell
getEmpleadoById(1, (err, empleado) => {
  if (err) return console.log(err);
  console.log(`El empleado obtenido es: ${empleado.name}`);

  getSalarioByEmpleado(empleado, (err, resp) => {
    if (err) return console.log(err);

    let { nombre, salario, id } = resp;
    console.log(`El salario de ${nombre} es de ${salario}$. ID: ${id}`);
  });
});
