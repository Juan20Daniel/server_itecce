const connection = require('../model/model');
const Auth = {};

Auth.getUser = (username, result) => {
    const sql = 'SELECT userName, password FROM admin WHERE userName = ?';
    connection.query(sql, [username], (err, user) => {
        if(err) {
            result(err, null);
        } else {
            result(null, user);
        }
    });
}

module.exports = Auth;