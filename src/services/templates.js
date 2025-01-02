const connection = require('../database/connection');
const Templates = {}

Templates.selectAll = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT imgFront, imgReverse, idSectionIdTemp FROM idtemplates';
        connection.query(sql, (err, data) => {
            if(err) return reject(err);
            return resolve(data);   
        });
    })
}
Templates.update = (dataToUpdate, idSection) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE idtemplates SET ${dataToUpdate.type}=? WHERE idSectionIdTemp = ?`
        connection.query(sql, [dataToUpdate.imgBuffer, idSection], (err, data) => {
            if(err) return reject(err);
            return resolve(data);   
        });
    })
}
module.exports = Templates;