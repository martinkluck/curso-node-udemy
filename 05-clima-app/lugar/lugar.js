const axios = require('axios');

const getLugarLatLng = async( dir ) => {
    const encoderUrl = encodeURI(dir)
    
    const instance = axios.create({
        baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=' + encoderUrl,
        headers: {
            'X-RapidAPI-Host': 'devru-latitude-longitude-find-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'b51ccf1b54mshb70a0f593122802p1d73ddjsn1f0edb143246'
        }
    });
    
    const resp = await instance.get();

    if(resp.data.Results.length === 0){
        throw new Error(`No hay resultados para ${dir}`);
    }

    const data = resp.data.Results[0];
    const direccion = data.name;
    const lat = data.lat;
    const lng = data.lon;

        return {
            direccion,
            lat,
            lng
        }
}

module.exports = {
    getLugarLatLng
}
