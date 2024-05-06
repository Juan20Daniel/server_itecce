const connection = require('../model/model');
const Teachers = {}

Teachers.getAll = (result) => {
    const sql = "SELECT idPerson, name, firstname, lastname, avatar FROM persons WHERE typePerson = 'TEACHER'";
    connection.query(sql, (err, teachers) => {
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