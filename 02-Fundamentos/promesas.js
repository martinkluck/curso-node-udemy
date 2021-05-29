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

const id = 4;

// getEmpleado(id)
//   .then((empleado) => console.log(empleado))
//   .catch((err) => console.log(err));

// getSalario(id)
//   .then((salario) => console.log(salario))
//   .catch((err) => console.error(err));

// getEmpleado(id)
//   .then((empleado) => {
//     getSalario(id)
//       .then((salario) => {
//         console.log("El empleado", empleado, "tiene un salario de", salario);
//       })
//       .catch((err) => console.log(err));
//   })
//   .catch((err) => console.log(err));

let nombre;

getEmpleado(id)
  .then((empleado) => {
    nombre = empleado;
    return getSalario(id);
  })
  .then((salario) => {
    console.log("El empleado", nombre, "tiene un salario de", salario);
  })
  .catch((err) => console.error(err));
