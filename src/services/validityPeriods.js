const connection = require('../database/connection');
const { beginTransactionAsync, queryAsync, commitAsync, rollbackAsync } = require('../utils/mysql');
const ValidityPeriods = {}

ValidityPeriods.selectAll = () => {
    const sql = 'SELECT period, type, idSectionValid AS idValidityPeriod FROM sections INNER JOIN validityPeriod ON sections.idSection = validityPeriod.idSectionValid;';
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}
ValidityPeriods.updateAll = async (validityPeriods) => {
    try {
        const { students, teachers, collaborators } = validityPeriods;
        await beginTransactionAsync();
        const sql = 'UPDATE validityperiod SET period=? WHERE idSectionValid=?';
        await queryAsync(sql, [students, 1]);
        await queryAsync(sql, [teachers, 2]);
        await queryAsync(sql, [collaborators, 3]);
        await commitAsync();
        return 'Se actualizo la vigencia de las credenciales.';
    } catch (error) {
        console.log(error);
        await rollbackAsync();
        throw new Error('Error al actualizar la vigencia de las credenciales');
    }
}
module.exports = ValidityPeriods;