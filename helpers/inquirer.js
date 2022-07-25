require('colors');
const inquirer = require('inquirer');

const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Seleccione una opción:',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`,
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`,
            },
            {
                value: 0,
                name: `0. Salir`.red,
            },
        ],
    },
];

const inquirerMenu = async () => {
    console.clear();
    console.log('======================================================='.green);
    console.log('Seleccione una opción:'.white);
    console.log('======================================================='.green);

    const { opcion } = await inquirer.prompt(menuOpts);

    return opcion;
};

const pausa = async () => {
    console.log();
    const msg = [{
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.green} para continuar`,
    }];
    await inquirer.prompt(msg);


}

const leerInput = async (message) => {
    const msg = [{
        type: 'input',
        name: 'input',
        message,
        validate(value) {
            if (!value) {
                return 'Debe ingresar una descripción';
            }
            return true;
        }
    }];
    const { input } = await inquirer.prompt(msg);
    return input;
}

const listarLugares = async (ciudades = []) => {

    const choices = ciudades.map((ciudad, i) => {
        const index = `${(i + 1)}.`.green;
        const { id, nombre } = ciudad;
        return {
            value: id,
            name: `${index} ${nombre}`,
        }
    });

    choices.unshift({
        value: '0',
        name: '0. Cancelar'.red
    })

    const tareasOpt = {
        type: 'list',
        name: 'id',
        message: 'Seleccione lugar:',
        choices
    }

    const { id } = await inquirer.prompt(tareasOpt);
    return id;
}
const listadoTareasChecklist = async (tareas = []) => {


    const choices = tareas.map((tarea, i) => {
        const index = `${(i + 1)}.`.green;
        const { id, descripcion, completadoEn } = tarea;
        return {
            value: id,
            name: `${index} ${descripcion}`,
            checked: (completadoEn),

        }
    });


    const tareasOpt = {
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }

    const { ids } = await inquirer.prompt(tareasOpt);
    return ids;
}
const confirmar = async (message) => {
    const question = {

        type: 'confirm',
        name: 'ok',
        message
    }

    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    listadoTareasChecklist,
    confirmar,
};
