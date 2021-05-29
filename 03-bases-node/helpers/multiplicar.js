const fs = require("fs");
const colors = require("colors");
const crearArchivo = async (base = 5, l = false, hasta = 10) => {
  try {
    let salida = "";
    let consola = "";

    for (let index = 1; index <= hasta; index++) {
      salida += `${base} x ${index} = ${base * index}\n`;
      consola += `${base} ${"x".green} ${index} ${"=".cyan} ${base * index}\n`;
    }

    if (l) {
      console.log(`-------------`.green);
      console.log(`Tabla del `.red, colors.yellow(base));
      console.log(`-------------`.green);
      console.log(consola);
    }

    await fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);
    return `tabla-${base}.txt`;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  crearArchivo,
};
