const connection = require('../database/connection');
const { beginTransactionAsync, queryAsync, commitAsync, rollbackAsyn } = require('../utils/mysql');
const ValidityPeriods = {}

ValidityPeriods.selectAll = (result) => {
    const sql = 'SELECT period, type, idSectionValid AS idValidityPeriod FROM sections INNER JOIN validityPeriod ON sections.idSection = validityPeriod.idSectionValid;';
    connection.query(sql, (err, data) => {
        if(err) {
            result(err, null);
        } else {
            result(null, data);
        }
    });
}
ValidityPeriods.updateAll = async (validityPeriods, result) => {
    try {
        const { students, teachers, collaborators } = validityPeriods;
        await beginTransactionAsync();
        const sql = 'UPDATE validityperiod SET period=? WHERE idSectionValid=?';
        await queryAsync(sql, [students, 1]);
        await queryAsync(sql, [teachers, 2]);
        await queryAsync(sql, [collaborators, 3]);
        await commitAsync();
        result(null, true);
    } catch (error) {
        result(err, null);
        await rollbackAsyn();
    }
}
module.exports = ValidityPeriods;