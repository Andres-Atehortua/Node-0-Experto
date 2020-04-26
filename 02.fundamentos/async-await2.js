// SOLUCIONANDO EJERCICIO DE EMPLEADOS Y SALARIOS CON ASYNC AWAIT

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
let getEmpleadoById = async (id) => {
  let empleadoDB = empleados.find((empleado) => empleado.id === id);
  if (!empleadoDB)
    throw new Error(`No existe ningún empleado con el id: ${id}`);
  else return empleadoDB;
};

let getSalarioByEmpleado = async (empleado) => {
  let salarioDB = salarios.find((salario) => salario.id === empleado.id);
  if (!salarioDB)
    throw new Error(`No existe salario para el empleado: ${empleado.name}`);
  else
    return {
      nombre: empleado.name,
      salario: salarioDB.salario,
      id: empleado.id,
    };
};

let getInformacion = async (id) => {
  let empleado = await getEmpleadoById(id);
  let respuesta = await getSalarioByEmpleado(empleado);
  let { nombre, salario, id: ID } = respuesta;
  return `El salario de ${nombre} es ${salario}. ID: ${ID}`;
};

getInformacion(3)
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.log(error.message));
