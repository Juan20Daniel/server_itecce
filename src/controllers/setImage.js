const multer = require('multer');
const path = require('path');
const moment = require('moment');
const fs = require('fs');
const connection = require('../model/model');
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../images"),
    filename: (req, file, cb) => {
        cb(null, `${moment().unix()+".JPG"}`)
    }
});

const load = multer({ storage });
const moveImage = load.single('image');

const registerImage = (req, res) => {
    const { filename } = req.file;
    const { data } = req.body;
    const { oldImg, idClient } = JSON.parse(data);
    const sql = 'CALL setImage(?,?)';
    connection.query(sql, [filename, idClient], (err, rows) => {
        if(err) return res.status(500).json({message:"Error en el servidor", err});
        const result = JSON.parse(JSON.stringify(rows));
        if(oldImg !== "NOT_IMG") {
            fs.unlinkSync(path.join(__dirname, '../images/'+oldImg));
        }

        res.status(200).json({
            message:"Imagen guardada.",
            newImage:filename,
            studens:result[0].length === 0 ? "No hay alumnos registrados" : rows[0], 
            teachers:result[1].length === 0 ? "No hay maestros registrados" : rows[1], 
            collaborators:result[2].length === 0 ? "No hay collaboradores registrados" : rows[2]
        });
    })
}

module.exports = {
    moveImage,
    registerImage
}
