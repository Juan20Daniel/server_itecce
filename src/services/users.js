const connection = require('../database/connection');
const Users = {}

Users.getUser = (username) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT email, userName, password FROM admin WHERE userName = ?';
        connection.query(sql, [username], (err, user) => {
            if(err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}

Users.updateAll = async (fields, userData, username) => {
    const sql = `UPDATE admin SET ${fields.map(field => `${field}=?`)} WHERE username=?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [...userData, username], (err, res) => {
            if(err) return reject(err);
            resolve();
        })
    })
}

module.exports = Users;