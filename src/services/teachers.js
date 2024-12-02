const connection = require('../database/connection');
const Teachers = {}

Teachers.insertTeacher = (client, result) => {
    const { id,name,firstname,lastname } = client;
    const sql = 'INSERT INTO clients (idClient, name, firstname, lastname, idSectionClients) VALUES(?,?,?,?,?)';
    connection.query(sql, [id,name,firstname,lastname,2], (err, data) => {
        if(err) {
            result(err, null);
        } else {
            result(null, data);
        }
    });
}

module.exports = Teachers;