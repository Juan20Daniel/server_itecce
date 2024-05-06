const bcrypt = require('bcryptjs');
const Auth = require('../services/auth');
const { createToken } = require('../utils/createToken');

const login = (req, res) => {
    const { username, password } = req.params;
    Auth.getUser(username, (err, user) => {
        if(err) return res.status(500).json({success:false, message:err});
        if(user.length === 0) return res.status(404).json({success:false, message:'El usuario no fue encontrado, favor de verificar que esta escrito correctemente.'});
        const comparePassword = bcrypt.compareSync(password, user[0].password);
        if(!comparePassword) return res.status(500).json({success:false, message:'La contraseña es incorrecta, favor de verificar que esta escrita correctemente'});
        res.status(201).json({success:true, token:createToken(username)});
    })
}

module.exports = {login};






// Auth.create = (req, res) => {
//     const { userName, password } = req.body;
//     let salt = bcrypt.genSaltSync(10);
//     let hash = bcrypt.hashSync(password, salt);
//     const sql = "INSERT INTO admin VALUES(?,?)";

//     connection.query(sql, [userName, hash], (err, result) => {
//         if(err) {
//            return res.status(500).json({err});
//         }
//         res.status(200).json({message:'Admin Created', result});
//     })
// }