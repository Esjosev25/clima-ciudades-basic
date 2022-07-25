const { guardarDB, leerDB } = require("../services/db.service");
const { searchCity } = require("../services/mapbox.service");
const { getWheather } = require("../services/openwheather.service");


class Busquedas {

    historial = [];
    constructor() {
        const db = leerDB();
        this.historial = db.historial;
    }

    get historialCapitalizado() {
        return this.historial.map(ciudad => {
            let palabras = ciudad.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        })
    }

    async ciudad(lugar = '') {
        try {

            const ciudades = await searchCity(lugar);
            return ciudades.map(ciudad => ({
                id: ciudad.id,
                nombre: ciudad.place_name,
                lng: ciudad.center[0],
                lat: ciudad.center[1],
            }));
        } catch (error) {
            console.error(error);
            return [];

        }

    }

    async climaCiudad(lat, lon) {
        try {
            const clima = await getWheather(lat, lon);
            const { main, weather } = clima

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    agregarHistorial(lugar = '') {
        //TODO: prevenir duplicados

        if (this.historial.includes(lugar.toLocaleLowerCase()))
            return
        this.historial = this.historial.splice(0, 4);
        this.historial.unshift(lugar.toLocaleLowerCase());
        //grabar db

        guardarDB(this.historial);

    }





}

module.exports = Busquedas;