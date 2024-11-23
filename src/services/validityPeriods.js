const connection = require('../database/connection');
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

module.exports = ValidityPeriods;