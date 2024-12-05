const bcrypt = require('bcryptjs');
const Auth = require('../services/auth');
const { createToken } = require('../utils/createToken');

const login = (req, res) => {
    const { username, password } = req.params;
    Auth.getUser(username, (err, user) => {
        if(err) return res.status(500).json({
            success:false, 
            message:'Error al iniciar sesión',
            error:err
        });
        if(user.length === 0) return res.status(404).json({
            success:false, 
            message:'El usuario no fue encontrado, favor de verificar que esta escrito correctemente.'
        });
        const comparePassword = bcrypt.compareSync(password, user[0].password);
        if(!comparePassword) return res.status(500).json({
            success:false,
            message:'La contraseña es incorrecta, favor de verificar que esta escrita correctemente'
        });
        res.status(201).json({success:true, token:createToken(username)});
    });
}
module.exports = {login};