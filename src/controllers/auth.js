const bcrypt = require('bcryptjs');
const Auth = require('../services/auth');
const { createToken } = require('../utils/createToken');

const login = async (req, res) => {
    try {
        const { username, password } = req.params;
        const user = await Auth.getUser(username);

        // const saltRounds = 10;
        // const salt = bcrypt.genSaltSync(saltRounds);
        // const hash = bcrypt.hashSync(password, salt);
        // console.log(user);

        if(user.length === 0) return res.status(404).json({
            message:'El usuario no fue encontrado, favor de verificar que esta escrito correctemente.'
        });
        const comparePassword = bcrypt.compareSync(password, user[0].password);
        if(!comparePassword) return res.status(500).json({
            message:'La contraseña es incorrecta, favor de verificar que esta escrita correctemente'
        });
        res.status(201).json({success:true, token:createToken(username)});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Error al iniciar sesión'
        });
    }
}
module.exports = {login};