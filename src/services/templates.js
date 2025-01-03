const connection = require('../database/connection');
const Templates = {}

Templates.selectAll = () => {
    const sql = 'SELECT imgFront, imgReverse, idSectionIdTemp FROM idtemplates';
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, data) => {
            if(err) return reject(err);
            return resolve(data);   
        });
    })
}
Templates.update = (dataToUpdate, idSection) => {
    const sql = `UPDATE idtemplates SET ${dataToUpdate.type}=? WHERE idSectionIdTemp = ?`
    return new Promise((resolve, reject) => {
        connection.query(sql, [dataToUpdate.imgBuffer, idSection], (err, data) => {
            if(err) return reject(err);
            return resolve(data);   
        });
    })
}
module.exports = Templates;