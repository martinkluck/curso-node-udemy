const empleados = [
  {
    id: 1,
    nombre: "Martin",
  },
  {
    id: 3,
    nombre: "Marcelo",
  },
  {
    id: 4,
    nombre: "Lucas",
  },
];

const salarios = [
  {
    id: 1,
    salario: 1000,
  },
  {
    id: 3,
    salario: 1500,
  },
];

const getEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((empleado) => empleado.id === id)?.nombre;
    if (empleado) {
      resolve(empleado);
    } else {
      reject(`No existe empleado con id ${id}`);
    }
  });
};

const getSalario = () => {
  return new Promise((resolve, reject) => {
    const salario = salarios.find((s) => s.id === id)?.salario;
    if (salario) {
      resolve(salario);
    } else {
      reject(`No existe salario para el id ${id}`);
    }
  });
};

const getInfoUsuario = async (id) => {
  try {
    const empleado = await getEmpleado(id);
    const salario = await getSalario(id);
    return `El salario de ${empleado} es de ${salario}`;
  } catch (error) {
    throw error;
  }
};

const id = 4;

getInfoUsuario(id)
  .then((msg) => console.log(msg))
  .catch((err) => console.error(err));
