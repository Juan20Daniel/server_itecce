const connection = require('../database/connection');
const SchoolIdentityCard = {};

SchoolIdentityCard.getIdInfoById = (id) => {
    const sql = `SELECT idClient, name, firstname, lastname, idSectionClients, fullname as seccion, groupStudent FROM clients 
    LEFT JOIN infostudens ON clients.idClient = infostudens.idClientInfo 
    LEFT JOIN careers ON infoStudens.idCareerInfo = careers.idCareer WHERE idClient = ?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, parseInt(id), (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

module.exports = SchoolIdentityCard;