const connection = require('../database/connection');
const Teachers = {}

Teachers.getAll = (offset, result) => {
    const sql = "SELECT idPerson, name, firstname, lastname, typePerson, avatar FROM persons WHERE typePerson='TEACHER' LIMIT 21 OFFSET ?";
    connection.query(sql, [offset], (err, teachers) => {
        if(err) {
            result(err, null);
        } else {
            result(null, teachers);
        }
    });
}
Teachers.getById = (id, offset, result) => {
    const sql = "SELECT idPerson, name, firstname, lastname, typePerson, avatar FROM persons WHERE typePerson='TEACHER' AND CAST(idPerson AS CHAR) LIKE ? LIMIT 21 OFFSET ?";
    connection.query(sql, [`${id}%`,parseInt(offset)], (err, teachers) => {
        if(err) {
            result(err, null);
        } else {
            result(null, teachers);
        }
    });
}
Teachers.getByFullname = (name, firstname, lastname, offset, result) => {
    const sql = "SELECT idPerson, name, firstname, lastname, typePerson, avatar FROM persons WHERE typePerson='TEACHER' AND name LIKE ? AND firstname LIKE ? AND lastname LIKE ? LIMIT 21 OFFSET ?";
    connection.query(sql, [`${name}%`,`${firstname}%`,`${lastname}%`,parseInt(offset)], (err, teachers) => {
        if(err) {
            result(err, null);
        } else {
            result(null, teachers);
        }
    });
}
Teachers.getNumTotal = (result) => {
    const sql = "SELECT COUNT(*) as total FROM persons WHERE typePerson='TEACHER'";
    connection.query(sql, (err, total) => {
        if(err) {
            result(err, null);
        } else {
            result(null, total[0].total);
        }
    });
}
// Teachers.insert = (teachers, result) => {
//     const sql = 'INSERT INTO persons (idPerson,name,firstname,lastname,typePerson,avatar) VALUES ?'
//     connection.query(sql, [teachers], (err, res) => {
//         if(err) {
//             result(err, null);
//         } else {
//             result(null, res.affectedRows);
//         }
//     });
// }
Teachers.insertTeacher = (person, result) => {
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
Teachers.remove = (id, result) => {
    const sql = 'DELETE FROM persons WHERE idPerson = ?'
    connection.query(sql, [id], (err, res) => {
        if(err) {
            result(err, null);
        } else {
            result(null, res.affectedRows);
        }
    });
}
module.exports = Teachers;