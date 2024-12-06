const connection = require('../database/connection');
const Templates = {}

Templates.selectAll = (result) => {
    const sql = 'SELECT imgFront, imgReverse, idSectionIdTemp FROM idtemplates';
    connection.query(sql, (err, data) => {
        if(err) return result(err, null);
        return result(null, data);   
    });
}
Templates.update = (dataToUpdate, idSection, result) => {

    const sql = `UPDATE idtemplates SET ${dataToUpdate.type}=? WHERE idSectionIdTemp = ?`
    connection.query(sql, [dataToUpdate.imgBuffer, idSection], (err, data) => {
        if(err) return result(err, null);
        return result(null, data);   
    });
}
module.exports = Templates;