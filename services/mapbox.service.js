require('dotenv').config();
const axios = require('axios');

const urlAPI = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const searchCity = async (city = '') => {
    try {
        const url = `${urlAPI}${city}.json`

        const res = await getRequest(url);
        return res.data.features;
    } catch (error) {
        console.error(error);
    }
}

const getRequest = async (url) => {
    try {
        const config = {
            params: {
                'access_token': process.env.MAPBOX_KEY,
                'limit': 5,
                'language': 'es'
            }
        }
        return await axios.get(url, config);

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    searchCity
}