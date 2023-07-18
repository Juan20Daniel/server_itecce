const connection = require('../model/model');

const getStudens = (req, res) => {
    const sql = "CALL getData";
    connection.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
            return false;
        }
        res.status(200).json({
            studens:rows[0].length === 0 ? "No hay alumnos registrados" : rows[0], 
            teachers:rows[1].length === 0 ? "No hay maestros registrados" : rows[1], 
            collaborators:rows[2].length === 0 ? "No hay collaboradores registrados" : rows[2]
        })
    })
    
}

module.exports = getStudens;