const {rollbackAsync, commitAsync, queryAsync, beginTransactionAsync } = require('../utils/mysql');
const connection = require('../database/connection');
const Clients = {}

Clients.getIds = () => {
    const sql = 'SELECT idClient, idSectionClients FROM clients';
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}
Clients.getClientsByType = async (type) => {
    let sql = null;
    if(type === 1) {
        sql = `
            SELECT idClient, name, firstname, lastname, idCareer, fullname as seccion, groupStudent FROM clients 
            INNER JOIN infoStudens ON clients.idClient = infoStudens.idClientInfo 
            INNER JOIN careers ON infoStudens.idCareerInfo = careers.idCareer WHERE idSectionClients = ?
        `
    } else sql = `SELECT idClient, name, firstname, lastname FROM clients WHERE idSectionClients = ?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [type], (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

Clients.saveData = async (personalData, schoolData=[], clientsToUpdate=[]) => {
    try {
        await beginTransactionAsync();
        if(clientsToUpdate.length) {
            let sql_update_personal_data ='UPDATE clients SET name=?, firstname=?, lastname=? WHERE idClient = ?';
            let sql_update_school_data = 'UPDATE infostudens SET groupStudent=?, idCareerInfo=? WHERE idClientInfo = ?';
            for(const client of clientsToUpdate) {
                if(client.hasOwnProperty('name')) {
                    await queryAsync(sql_update_personal_data, [
                        client.name,
                        client.firstname,
                        client.lastname,
                        client.idClient
                    ]);
                }
                if(client.hasOwnProperty('groupStudent')) {
                    await queryAsync(sql_update_school_data, [
                        client.groupStudent,
                        client.idCareerInfo,
                        client.idClient
                    ]);
                }
            };
        }
        if(personalData.length) {
            const sql_insert_personal_data = 'INSERT INTO clients (idClient,name,firstname,lastname,idSectionClients) VALUES ?';
            await queryAsync(sql_insert_personal_data, [personalData]);
        }
        if(schoolData.length) {
            const sql_insert_school_data = 'INSERT INTO infostudens (groupStudent, idCareerInfo, idClientInfo) VALUES ?';
            await queryAsync(sql_insert_school_data, [schoolData]);
        }
        await commitAsync();
        return {news:personalData.length, updateds:clientsToUpdate.length};
    } catch (error) {
        console.log(error);
        await rollbackAsync();
        throw new Error('Error al guardar la información del archivo excel');
    }
}

Clients.removeClientsByType = (type) => {
    const sql = 'DELETE FROM clients WHERE idSectionClients=?';
    return new Promise((resolve, reject) => {
        connection.query(sql, [type], (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

Clients.removeAll = () => {
    const sql = 'DELETE FROM clients';
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = Clients;