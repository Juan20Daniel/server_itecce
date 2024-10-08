const connection = require('../database/connection');
const Report = {}

Report.getData = (section, result) => {
    const sql = `SELECT idPerson, name, firstname, lastname, printed_at, delivered_at FROM persons INNER JOIN identityinfo ON persons.idPerson = identityinfo.idPerson_ident WHERE typePerson = ?`;
    connection.query(sql, [section], (err, data) => {
        if(err) {
            result(err, null);
        } else {
            result(null, data);
        }
    });
}

module.exports = Report;