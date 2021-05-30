const fs = require("fs");

const archivo = "./db/data.json";
const guardarDB = (data) => {
  try {
    fs.writeFileSync(archivo, JSON.stringify(data));
    return true;
  } catch (error) {
    throw error;
  }
};

const leerDB = () => {
    if(!fs.existsSync(archivo)){
        return null;
    }
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    return JSON.parse(info);
};

module.exports = {
  guardarDB,
  leerDB
};
