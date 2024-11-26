const connection = require('../database/connection');
const { beginTransactionAsync, queryAsync, commitAsync, rollbackAsyn } = require('../utils/mysql');
const ValidityPeriods = {}

ValidityPeriods.selectAll = (result) => {
    const sql = 'SELECT type, period FROM validityperiod';
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
        const sql = 'UPDATE validityperiod SET period=? WHERE type=?';
        await queryAsync(sql, [students, 'students']);
        await queryAsync(sql, [teachers, 'teachers']);
        await queryAsync(sql, [collaborators, 'collaborators']);
        await commitAsync();
        result(null, true);
    } catch (error) {
        result(err, null);
        await rollbackAsyn();
    }
}
module.exports = ValidityPeriods;