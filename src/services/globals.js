const connection = require('../database/connection');
const { getFullDate } = require('../utils/getDate');
const {rollbackAsync, commitAsync, queryAsync, beginTransactionAsync } = require('../utils/mysql');
const Globals = {};

Globals.getInfoDB = (typePerson, result) => {
    const sql = 'CALL getInfo(?)';
    connection.query(sql, [typePerson], (err, info) => {
        if(err) {
            result(err, null);
        } else {
            result(null, info);
        }
    });
}

Globals.loadPersons = async (personsToInsert, personsToUpdate = [], result) => {
    try {
        await beginTransactionAsync();
        if(personsToUpdate.length) {
            const fulldate = getFullDate();
            const sqlUpdate = 'UPDATE persons SET name=?, firstname=?, lastname=?, updated_at=? WHERE idPerson = ?';
            personsToUpdate.forEach(async person => {
                await queryAsync(sqlUpdate, [person['Nombre'], person['Apellido paterno'], person['Apellido materno'], fulldate, parseInt(person['Matrícula'])]);
            });
        }
        if(personsToInsert.length) {
            const sqlInsert = 'INSERT INTO persons (idPerson,name,firstname,lastname,typePerson,avatar) VALUES ?'
            await queryAsync(sqlInsert, [personsToInsert]);
        }
        await commitAsync();
        result(null, {personsRegistered:personsToInsert.length, personsUpdated:personsToUpdate.length});
    } catch (error) {
        result(error, null);
        await rollbackAsync();
    }
}

module.exports = Globals;
