require("dotenv").config();
const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

// console.log(process.env.MAPBOX_KEY);

const main = async () => {
  try {
    const busquedas = new Busquedas();
    let opt;

    do {
      opt = await inquirerMenu();

      switch (opt) {
        case 1:
          // Mostrar mensaje
          const termino = await leerInput("Ciudad: ");
          // Buscar los lugares
          const lugares = await busquedas.ciudad(termino);
          // Seleccionar lugar
          const id = await listarLugares(lugares);
          if (id === 0) continue;
          // Guardar en DB
          const lugarSel = lugares.find((l) => l.id == id);
          busquedas.agregarHistorial(lugarSel.nombre);
          // Datos del Clima
          const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
          // Mostrar resultados
          console.clear();
          console.log("\nInformación de la ciudad\n".green);
          console.log("Ciudad: ", lugarSel.nombre.green);
          console.log("Lat: ", lugarSel.lat);
          console.log("Long: ", lugarSel.lng);
          console.log("Temperatura: ", `${clima.temp}°C`);
          console.log("Mínima: ", `${clima.min}°C`);
          console.log("Máxima: ", `${clima.max}°C`);
          console.log("Como está el clima:", clima.desc.green);
          break;
        case 2:
          busquedas.historialCapitalizado.forEach((lugar, index) => {
            const idx = `${index + 1}.`.green;
            console.log(`${idx} ${lugar}`);
          });
          break;
      }

      if (opt !== 0) await pausa();
    } while (opt !== 0);
  } catch (error) {
    throw error;
  }
};

main();
