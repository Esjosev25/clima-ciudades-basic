const fs = require('fs');
const dbPath = './db/database.json'

const guardarDB = (historial) => {

    const payload = {
        historial
    }
    fs.writeFileSync(dbPath, JSON.stringify(payload));
}

const leerDB = () => {
    if (!fs.existsSync(dbPath)) {
        return [];
    }
    const data = fs.readFileSync(dbPath,
        { encoding: 'utf8' })
    return JSON.parse(data);


}

module.exports = {
    guardarDB,
    leerDB
}