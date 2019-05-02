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

const getInfo = ( direccion ) => {

}

getInfo(argv.direccion)
.then()