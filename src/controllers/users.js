const Users = require('../services/users');
const { encryptPassword } = require('../utils/encryptPassword');
const { createToken, decodeToken } = require('../utils/jwt');
const updateAll = async (req, res) => {
       try {
        const token = req.headers.authorization.split(' ').pop();
        const {username:usernameToken} = decodeToken(token).data;

        if(req.body.hasOwnProperty('password')) {
            const {password} = req.body;
            req.body.password = encryptPassword(password);
        }
    
        const fields = Object.keys(req.body);
        if(!fields.length) {
            return res.status(200).json({message:'No hay datos para actualizar'});
        }
        const userData = Object.values(req.body);
        await Users.updateAll(fields, userData, usernameToken);

        if(!fields.includes('email') && !fields.includes('username')) {
            return res.status(200).json({message:'Usuario actualizado'});
        }

        let username = '';
        if(req.body.hasOwnProperty('username')) username = req.body.username;
        else username = usernameToken;
        const user = await Users.getUser(username);

        const data = {
            email:user[0].email,
            username:user[0].userName,
        }
        const newToken = createToken(data)
        return res.status(200).json({
            message:'Usuario actualizado',
            toke:newToken
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Error al actualizar los datos de la cuenta'
        });
    } 
}

module.exports = {
    updateAll
}