const connection = require('../model/model');
const beginTransactionAsync = () => {
    return new Promise((resolve, reject) => {
        connection.beginTransaction((err) => {
            if (err) {
                reject(err); // Rechazar la promesa si hay un error
            } else {
                resolve(); // Resolver la promesa si la transacción se inicia correctamente
            }
        });
    });
}
const queryAsync = (sql, values) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                reject(error); // Rechazar la promesa si hay un error en la consulta
            } else {
                resolve(results); // Resolver la promesa con los resultados de la consulta
            }
        });
    });
}
const commitAsync = () => {
    return new Promise((resolve, reject) => {
        connection.commit((err) => {
            if (err) {
                reject(err); // Rechazar la promesa si hay un error al confirmar la transacción
            } else {
                resolve(); // Resolver la promesa si la transacción se confirma correctamente
            }
        });
    });
}
const rollbackAsync = () => {
    return new Promise((resolve, reject) => {
        connection.rollback(() => {
            resolve(); // Resolver la promesa después de revertir la transacción
        });
    });
}

module.exports = {
    rollbackAsync,
    commitAsync,
    queryAsync,
    beginTransactionAsync
}