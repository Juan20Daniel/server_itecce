const connection = require('../database/connection');
const Careers = {}

Careers.getCareers = () => {
    const sql = 'SELECT idCareer, fullname, abridging, duration FROM careers';
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

Careers.saveCareers = (careers) => {
    const sql = 'INSERT INTO careers (fullname, abridging) VALUES ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, [careers], (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

Careers.updateCareer = (id, abridging, duration) => {
    const sql = 'UPDATE careers SET abridging=?, duration=? WHERE idCareer=?';
    return new Promise((resolve, reject) => {
        connection.query(sql, [abridging, duration, id], (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = Careers;