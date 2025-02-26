const connection = require('../database/connection');
const { beginTransactionAsync, queryAsync, commitAsync, rollbackAsync } = require('../utils/mysql');
const Careers = {}

Careers.getAll = () => {
    const sql = 'SELECT idCareer, fullname, abridging, duration FROM careers';
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

Careers.save = (careers) => {
    const sql = 'INSERT INTO careers (fullname, abridging) VALUES ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, [careers], (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

Careers.update = (id, abridging, duration) => {
    const sql = 'UPDATE careers SET abridging=?, duration=? WHERE idCareer=?';
    return new Promise((resolve, reject) => {
        connection.query(sql, [abridging, duration, id], (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

Careers.remove = async (id) => {
    try {
        await beginTransactionAsync();
        const sqlRemoveClients = 'DELETE clients, infostudens FROM clients JOIN infostudens ON clients.idClient = infostudens.idClientInfo WHERE idCareerInfo=?';
        const sqlRemoveCareer = 'DELETE FROM careers WHERE idCareer=?';
        await queryAsync(sqlRemoveClients, id);
        await queryAsync(sqlRemoveCareer, id);
        await commitAsync();

        return true;
    } catch (error) {
        await rollbackAsync();
        throw new Error(error);
    }
}
module.exports = Careers;