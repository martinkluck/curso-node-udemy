// const argv = require('yargs').argv;
const argv = require('./config/yargs.js').argv;

let comando = argv._[0]

switch (comando) {
    case 'crear':
        console.log('Crear actividar por hacer');
        break;
    case 'listar':
        console.log('Listar tareas');
        break;
    case 'actualizar':
        console.log('Actualizar tareas');
        break;

    default:
        console.log('Comando no reconocido');
        break;
}