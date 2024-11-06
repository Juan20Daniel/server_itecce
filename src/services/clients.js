const connection = require('../database/connection');
const Clients = {}
Clients.getClients = (type, offset, result) => {
    const sql = "SELECT idPerson, name, firstname, lastname, typePerson, avatar FROM persons WHERE typePerson=? LIMIT 21 OFFSET ?";
    connection.query(sql, [type, offset], (err, students) => {
      if(err) {
        result(err, null);
      } else {
        result(null, students);
      }
    });
}

module.exports = Clients;