const connection = require('../database/connection');
const Collaborators = {}

Collaborators.insertCollaborator = (client, result) => {
    const { id,name,firstname,lastname } = client;
    const sql = 'INSERT INTO clients (idClient, name, firstname, lastname, idSectionClients) VALUES(?,?,?,?,?)';
    connection.query(sql, [id,name,firstname,lastname,3], (err, data) => {
        if(err) {
            result(err, null);
        } else {
            result(null, data);
        }
    });
}
module.exports = Collaborators;