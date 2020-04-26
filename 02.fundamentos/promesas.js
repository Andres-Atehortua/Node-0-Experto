// Las promesas nos permiten ejecutar un trabajo, sincrono o asincrono, y ejecutar una tarea cuando este termine.

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

let getSalarioByEmpleado = (empleado) => {
  return new Promise((resolve, reject) => {
    let salarioDB = salarios.find((salario) => salario.id === empleado.id);
    !salarioDB
      ? reject(`No existe salario para el empleado: ${empleado.name}`)
      : resolve({
          nombre: empleado.name,
          salario: salarioDB.salario,
          id: empleado.id,
        });
  });
};

let getEmpleadoById = (id) => {
  return new Promise((resolve, reject) => {
    let empleadoDB = empleados.find((empleado) => empleado.id === id);
    !empleadoDB
      ? reject(`No existe ningún empleado con el id: ${id}`)
      : resolve(empleadoDB);
  });
};

getEmpleadoById(4).then(
  (empleado) => {
    console.log("Empleado de la BD:", empleado);

    getSalarioByEmpleado(empleado).then(
      (response) =>
        console.log(
          `El salario para ${response.nombre} es ${response.salario}`
        ),
      (err) => console.log(err)
    );
  },
  (err) => console.log(err)
);
