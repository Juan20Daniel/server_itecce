const connection = require('../model/model');
const Collaborators = {}

Collaborators.getAll = (result) => {
    const sql = "SELECT idPerson, name, firstname, lastname, avatar FROM persons WHERE typePerson = 'COLABORATOR'";
    connection.query(sql, (err, collaborators) => {
        if(err) {
            result(err, null);
        } else {
            result(null, collaborators);
        }
    });
}
Collaborators.insert = (collaborators, result) => {
    const sql = 'INSERT INTO persons (idPerson,name,firstname,lastname,typePerson,avatar) VALUES ?'
    connection.query(sql, [collaborators], (err, res) => {
        if(err) {
            result(err, null);
        } else {
            result(null, res.affectedRows);
        }
    });
}
module.exports = Collaborators;