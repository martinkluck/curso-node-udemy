const { crearArchivo } = require("./helpers/multiplicar");
const argv = require("./config/yargs");
const colors = require("colors");

console.clear();

// const [, , arg3 = "base=5"] = process.argv;
// const [, base = 5] = arg3.split("=");

// console.log(argv);

// console.log("base: ", argv.b);

crearArchivo(argv.b, argv.l, argv.t)
  .then((nombreArchivo) => console.log(`${nombreArchivo.rainbow} creado.`))
  .catch((err) => console.error(err));
