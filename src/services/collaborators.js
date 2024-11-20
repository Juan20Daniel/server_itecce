const connection = require('../database/connection');
const Collaborators = {}

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
module.exports = Collaborators;