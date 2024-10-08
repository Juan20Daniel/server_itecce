const connection = require('../database/connection');
const Collaborators = {}

Collaborators.getAll = (offset, result) => {
    const sql = "SELECT idPerson, name, firstname, lastname, typePerson, avatar FROM persons WHERE typePerson='COLABORATOR' LIMIT 21 OFFSET ?";
    connection.query(sql, [offset], (err, collaborators) => {
        if(err) {
            result(err, null);
        } else {
            result(null, collaborators);
        }
    });
}
Collaborators.getById = (id, offset, result) => {
    const sql = "SELECT idPerson, name, firstname, lastname, typePerson, avatar FROM persons WHERE typePerson='COLABORATOR' AND CAST(idPerson AS CHAR) LIKE ? LIMIT 21 OFFSET ?";
    connection.query(sql, [`${id}%`,parseInt(offset)], (err, collaborators) => {
        if(err) {
            result(err, null);
        } else {
            result(null, collaborators);
        }
    });
}
Collaborators.getByFullname = (name, firstname, lastname, offset, result) => {
    const sql = "SELECT idPerson, name, firstname, lastname, typePerson, avatar FROM persons WHERE typePerson='COLABORATOR' AND name LIKE ? AND firstname LIKE ? AND lastname LIKE ? LIMIT 21 OFFSET ?";
    connection.query(sql, [`${name}%`,`${firstname}%`,`${lastname}%`,parseInt(offset)], (err, collaborators) => {
        if(err) {
            result(err, null);
        } else {
            result(null, collaborators);
        }
    });
}
Collaborators.getNumTotal = (result) => {
    const sql = "SELECT COUNT(*) as total FROM persons WHERE typePerson='COLABORATOR'";
    connection.query(sql, (err, total) => {
        if(err) {
            result(err, null);
        } else {
            result(null, total[0].total);
        }
    });
}
Collaborators.insertCollaborator = (person, result) => {
    const { id,name,firstname,lastname,typePerson } = person;
    const sql = 'INSERT INTO persons ( idPerson, name, firstname, lastname, typePerson, avatar) VALUES(?,?,?,?,?,?)';
    connection.query(sql, [id,name,firstname,lastname,typePerson,getAvatar()], (err, data) => {
        if(err) {
            result(err, null);
        } else {
            result(null, data);
        }
    });
}
Collaborators.remove = (id, result) => {
    const sql = 'DELETE FROM persons WHERE idPerson = ?'
    connection.query(sql, [id], (err, res) => {
        if(err) {
            result(err, null);
        } else {
            result(null, res.affectedRows);
        }
    });
}
module.exports = Collaborators;