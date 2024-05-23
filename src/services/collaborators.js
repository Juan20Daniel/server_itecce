const connection = require('../model/model');
const Collaborators = {}

Collaborators.getAll = (offset, result) => {
    const sql = "SELECT idPerson, name, firstname, lastname, avatar FROM persons WHERE typePerson='COLABORATOR' LIMIT 21 OFFSET ?";
    connection.query(sql, [offset], (err, collaborators) => {
        if(err) {
            result(err, null);
        } else {
            result(null, collaborators);
        }
    });
}
Collaborators.getById = (id, offset, result) => {
    const sql = "SELECT idPerson, name, firstname, lastname, avatar FROM persons WHERE typePerson='COLABORATOR' AND CAST(idPerson AS CHAR) LIKE ? LIMIT 21 OFFSET ?";
    connection.query(sql, [`${id}%`,parseInt(offset)], (err, collaborators) => {
        if(err) {
            result(err, null);
        } else {
            result(null, collaborators);
        }
    });
}
Collaborators.getByFullname = (name, firstname, lastname, offset, result) => {
    const sql = "SELECT idPerson, name, firstname, lastname, avatar FROM persons WHERE typePerson='COLABORATOR' AND name LIKE ? AND firstname LIKE ? AND lastname LIKE ? LIMIT 21 OFFSET ?";
    connection.query(sql, [`${name}%`,`${firstname}%`,`${lastname}%`,parseInt(offset)], (err, collaborators) => {
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