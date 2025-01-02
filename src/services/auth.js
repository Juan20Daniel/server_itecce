const connection = require('../database/connection');
const Auth = {};

Auth.getUser = (username) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT userName, password FROM admin WHERE userName = ?';
        connection.query(sql, [username], (err, user) => {
            if(err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}

module.exports = Auth;