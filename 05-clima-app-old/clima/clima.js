const axios = require('axios');

const getClima = async ( lat, lng ) => {
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=0ce46f59c8c79704a018239066279614&units=metric&lang=es`)
    return resp.data.main.temp;
}

module.exports = {
    getClima
}