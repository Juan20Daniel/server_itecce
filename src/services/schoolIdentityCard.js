const connection = require('../database/connection');
const SchoolIdentityCard = {};

SchoolIdentityCard.getIdInfoById = (id, result) => {
    const sql = `SELECT idClient, name, firstname, lastname, idSectionClients, seccion, groupStudent FROM 
    clients LEFT JOIN infostudens ON clients.idClient = infostudens.idClientInfo WHERE idClient=?`;
    connection.query(sql, parseInt(id), (err, data) => {
        if(err) {
            result(err, null);
        } else {
            result(null, data);
        }
    });
}

module.exports = SchoolIdentityCard;