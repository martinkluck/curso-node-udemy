const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener',
        demand: true
    }
}).argv;

/* lugar.getLugarLatLng(argv.direccion)
.then(console.log); */

/* clima.getClima(40,-74)
.then(console.log)
.catch(console.log); */

const getInfo = async ( direccion ) => {
    try {
        const coordenadas = await lugar.getLugarLatLng(direccion);
        const temperatura = await clima.getClima(coordenadas.lat, coordenadas.lng);
        return `El clima de ${coordenadas.direccion} es de ${temperatura}°C.`;        
    } catch (error) {
        return `No se pudo determinar el clima de  ${coordenadas.direccion}.`;
    }
}

getInfo(argv.direccion)
.then( console.log )
.catch( console.log )