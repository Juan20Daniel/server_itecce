const connection = require('../database/connection');
const Templates = {}

Templates.selectAll = (result) => {
    const sql = 'SELECT imgFront, imgReverse, idSectionIdTemp FROM idtemplates';
    connection.query(sql, (err, data) => {
        if(err) return result(err, null);
        return result(null, data);   
    });
}
Templates.update = (imgBuffer, type, idSection, result) => {
    const sql = {
        'imgFront':'UPDATE idtemplates SET imgFront=? WHERE idSectionIdTemp = ?',
        'imgReverse':'UPDATE idtemplates SET imgReverse=? WHERE idSectionIdTemp = ?'
    }
    connection.query(sql[type], [imgBuffer, idSection], (err, data) => {
        if(err) return result(err, null);
        return result(null, data);   
    });
}
module.exports = Templates;