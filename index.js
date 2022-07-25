const {
    leerInput,
    inquirerMenu,
    pausa,
    confirmar,
    listarLugares,
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');


const main = async () => {
    const busquedas = new Busquedas();

    let opt = '';
    let ok;

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const lugar = await leerInput('Ciudad: ');

                const ciudades = await busquedas.ciudad(lugar);

                const id = await listarLugares(ciudades);
                if (id === '0') continue;

                const { nombre, lat, lng } = ciudades.find(c => c.id === id);
                //guardar en historial
                busquedas.agregarHistorial(nombre);

                const clima = await busquedas.climaCiudad(lat, lng);
                const { temp, min, max, desc } = clima;
                console.clear();
                console.log('\n Información de la ciudad\n'.green);
                console.log('Ciudad:', nombre.green);
                console.log('Lat:', lat);
                console.log('Lng:', lng);
                console.log('Temperatura:', temp);
                console.log('Mínima:', min);
                console.log('Máxima:', max);
                console.log('Cómo está el clima:', desc.green);



                break;
            case 2:

                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const index = `${i + 1}.`.green
                    console.log(`${index} ${lugar}`);
                })
                break;
            case 0:
                ok = await confirmar();
                if (!ok) opt = '';
                break;
        }

        if (opt !== 0) await pausa();
    } while (opt !== 0);
};

main();
