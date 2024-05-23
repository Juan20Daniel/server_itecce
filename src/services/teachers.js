const connection = require('../model/model');
const Teachers = {}

Teachers.getAll = (offset, result) => {
    const sql = "SELECT idPerson, name, firstname, lastname, avatar FROM persons WHERE typePerson='TEACHER' LIMIT 21 OFFSET ?";
    connection.query(sql, [offset], (err, teachers) => {
        if(err) {
            result(err, null);
        } else {
            result(null, teachers);
        }
    });
}
Teachers.getById = (id, offset, result) => {
    const sql = "SELECT idPerson, name, firstname, lastname, avatar FROM persons WHERE typePerson='TEACHER' AND CAST(idPerson AS CHAR) LIKE ? LIMIT 21 OFFSET ?";
    connection.query(sql, [`${id}%`,parseInt(offset)], (err, teachers) => {
        if(err) {
            result(err, null);
        } else {
            result(null, teachers);
        }
    });
}
Teachers.getByFullname = (name, firstname, lastname, offset, result) => {
    const sql = "SELECT idPerson, name, firstname, lastname, avatar FROM persons WHERE typePerson='TEACHER' AND name LIKE ? AND firstname LIKE ? AND lastname LIKE ? LIMIT 21 OFFSET ?";
    connection.query(sql, [`${name}%`,`${firstname}%`,`${lastname}%`,parseInt(offset)], (err, teachers) => {
        if(err) {
            result(err, null);
        } else {
            result(null, teachers);
        }
    });
}

Teachers.insert = (teachers, result) => {
    const sql = 'INSERT INTO persons (idPerson,name,firstname,lastname,typePerson,avatar) VALUES ?'
    connection.query(sql, [teachers], (err, res) => {
        if(err) {
            result(err, null);
        } else {
            result(null, res.affectedRows);
        }
    });
}
module.exports = Teachers;