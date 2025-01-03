const connection = require('../database/connection');
const Clients = {}

Clients.getIds = async () => {
    const sql = 'SELECT idClient, idSectionClients FROM clients';
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}
Clients.getClientsByType = async (type) => {
    let sql = '';
    if(type === 1) sql = 'SELECT idClient, name, firstname, lastname, seccion, groupStudent FROM clients INNER JOIN infoStudens ON clients.idClient = infoStudens.idClientInfo WHERE idSectionClients = ?';
    else sql = `SELECT idClient, name, firstname, lastname FROM clients WHERE idSectionClients = ?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [type], (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}