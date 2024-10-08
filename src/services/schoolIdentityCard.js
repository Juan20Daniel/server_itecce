const connection = require('../database/connection');
const { rollbackAsync, commitAsync, queryAsync, beginTransactionAsync } = require('../utils/mysql');
const { getFullDate } = require('../utils/getDate');
const SchoolIdentityCard = {};
SchoolIdentityCard.getDate = async (result) => {
    const sql = 'SELECT printed_at, delivered_at, idPerson_ident FROM identityInfo';
    connection.query(sql, (err, data) => {
        if(err) {
            result(err, null);
        } else {
            result(null, data);
        }
    });
}
SchoolIdentityCard.getDateById = async (id, result) => {
    const sql = 'SELECT printed_at, delivered_at FROM identityInfo WHERE idPerson_ident = ?';
    connection.query(sql, [id], (err, data) => {
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
SchoolIdentityCard.insertDate = async (id, date, result) => {
    const sql = 'INSERT INTO identityInfo (printed_at, delivered_at, idPerson_ident) VALUES(?,?,?)';
    connection.query(sql, [date,null,id], (err, data) => {
        if(err) {
            result(err, null);
        } else {
            result(null, data);
        }
    });
}
SchoolIdentityCard.updateDate = async (id, date, fieldToUpdate, result) => {
    const fullDate = getFullDate();
    let sql = '';
    const updatePrintDate = 'UPDATE identityInfo SET printed_at=?, delivered_at=null, updated_at=? WHERE idPerson_ident=?';
    const updateDeliveryDate = 'UPDATE identityInfo SET delivered_at=?, updated_at=? WHERE idPerson_ident=?';
    if(fieldToUpdate === 'printed_at') sql = updatePrintDate;
    if(fieldToUpdate === 'delivered_at') sql = updateDeliveryDate;
    connection.query(sql, [date,fullDate,id], (err, data) => {
        if(err) {
            result(err, null);
        } else {
            result(null, data);
        }
    });
}

module.exports = SchoolIdentityCard;