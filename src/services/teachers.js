const connection = require('../database/connection');
const Teachers = {}

Teachers.insertTeacher = (client) => {
    return new Promise((resolve, reject) => {
        const { id,name,firstname,lastname } = client;
        const sql = 'INSERT INTO clients (idClient, name, firstname, lastname, idSectionClients) VALUES(?,?,?,?,?)';
        connection.query(sql, [id,name,firstname,lastname,2], (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

module.exports = Teachers;