require('dotenv').config();
const axios = require('axios');
const url = 'https://api.openweathermap.org/data/2.5/weather';

const getWheather = async (lat = '', lon = '') => {

    try {
        const config = {
            params: {
                appid: process.env.OPENWEATHER_KEY,
                lon,
                lat,
                lang: 'es',
                units: 'metric',
            }
        }
        const res = await axios.get(url, config);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getWheather
}