const fs = require('fs');
const path = require('path');
const connection = require('../model/model');

const deleteImg = (req, res) => {
    const { oldImg, idClient } = req.body;
    const sql = 'CALL setImage(?,?)';
    connection.query(sql, ["NOT_IMG", idClient], (err, rows) => {
        if(err) return res.status(500).json({message:"error del servidor", err});

        const result = JSON.parse(JSON.stringify(rows));
        fs.unlinkSync(path.join(__dirname, '../images/'+oldImg));
        
        res.status(200).json({
            message:"Imagen eliminada.",
            newImage:"NOT_IMG",
            studens:result[0].length === 0 ? "No hay alumnos registrados" : rows[0], 
            teachers:result[1].length === 0 ? "No hay maestros registrados" : rows[1], 
            collaborators:result[2].length === 0 ? "No hay colaboradores registrados" : rows[2]
        });
    });
}

module.exports = deleteImg;