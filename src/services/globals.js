const connection = require('../database/connection');
const {rollbackAsync, commitAsync, queryAsync, beginTransactionAsync } = require('../utils/mysql');
const Globals = {};

Globals.getInfoDB = (type, result) => {
    const sql = 'CALL getInfo(?)';
    connection.query(sql, [type], (err, info) => {
        if(err) {
            result(err, null);
        } else {
            result(null, info);
        }
    });
}

Globals.loadClients = async (clientsToInsert, clientsToUpdate = [], result) => {
    try {
        await beginTransactionAsync();
        if(clientsToUpdate.length) {
            const sql_update = 'UPDATE clients SET name=?, firstname=?, lastname=? WHERE idClient = ?';
            clientsToUpdate.forEach(async client => {
                await queryAsync(sql_update, [client['Nombre'], client['Apellido paterno'], client['Apellido materno'], parseInt(client['Matrícula'])]);
            });
        }
        if(clientsToInsert.length) {
            const sql_insert = 'INSERT INTO clients (idClient,name,firstname,lastname,idSectionClients) VALUES ?'
            await queryAsync(sql_insert, [clientsToInsert]);
        }
        await commitAsync();
        result(null, {clientsRegistered:clientsToInsert.length, clientsUpdated:clientsToUpdate.length});
    } catch (error) {
        result(error, null);
        await rollbackAsync();
    }
}

module.exports = Globals;
