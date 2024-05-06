const expretions = {
    username:/^\S[a-zA-ZóÓáÁéÉíÍúÚñÑ0-9 ]{5,30}\S$/,
    password:/^.{8,30}$/,
}
const check = (req, res, next) => {
    const { username, password } = req.params;
    if(!expretions.username.test(username)) return res.status(500).json({success:false, message:'El usuario no es valído'});
    if(!expretions.password.test(password)) return res.status(500).json({success:false, message:'La contraseña no es valída'});
    next();
}

module.exports = {check}