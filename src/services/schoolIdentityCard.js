const connection = require('../database/connection');
const { rollbackAsync, commitAsync, queryAsync, beginTransactionAsync } = require('../utils/mysql');
const { getFullDate } = require('../utils/getDate');
const SchoolIdentityCard = {};

SchoolIdentityCard.getIdInfoById = (id, result) => {
    const sql = `SELECT idPerson, name, firstname, lastname, typePerson, avatar, seccion, group_student FROM 
    persons LEFT JOIN infoschool ON persons.idPerson = infoschool.idPerson_info WHERE idPerson=?`;
    connection.query(sql, parseInt(id), (err, data) => {
        if(err) {
            result(err, null);
        } else {
            result(null, data);
        }
    });
}

SchoolIdentityCard.processPrintDate = async (dataToInsert = [], dataToUpdate = [], date, result) => {
    try {
        await beginTransactionAsync();
        if(dataToInsert.length) {
            const sqlInsert = 'INSERT INTO identityInfo (printed_at, delivered_at, idPerson_ident) VALUES ?'
            await queryAsync(sqlInsert, [dataToInsert]);
        }
        if(dataToUpdate.length) {
            const fullDate = getFullDate();
            const sqlUpdate = 'UPDATE identityInfo SET printed_at=?, updated_at=? WHERE idPerson_ident=?'
            dataToUpdate.forEach( async (data) => {
                await queryAsync(sqlUpdate,[date, fullDate, data.idPerson_ident]);
            });
        }
        await commitAsync();
        result(null, 'Se registro la fecha de creación de las credenciales.');
    } catch (error) {
        result(error, null);
        await rollbackAsync();
    }
}
module.exports = SchoolIdentityCard;