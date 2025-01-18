const bcrypt = require('bcryptjs');
const Users = require('../services/users');
const { createToken } = require('../utils/jwt');

const login = async (req, res) => {
    try {
        const { username, password } = req.query;
        const user = await Users.getUser(username);

        if(user.length === 0) return res.status(404).json({
            message:'El usuario no fue encontrado, favor de verificar que esta escrito correctemente.'
        });
        const comparePassword = bcrypt.compareSync(password, user[0].password);
        if(!comparePassword) return res.status(500).json({
            message:'La contraseña es incorrecta, favor de verificar que esta escrita correctemente.'
        });
        const data = {
            email:user[0].email,
            username
        }
        res.status(201).json({
            token:createToken(data)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Error al iniciar sesión'
        });
    }
}
module.exports = {login};