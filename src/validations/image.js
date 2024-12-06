const expretions = {
    imgTamplate: /^[a-zA-Z .-]{1,30}\.(jpg|JPG|jpeg|JPEG)$/
}
const verifyImg = (req, res, next) => {
    if(!req.file) {
        req.file = null;
        return next();
    }
    const { originalname } = req.file;
    if(!expretions.imgTamplate.test(originalname)) return res.status(500).json({
        success:false,
        message:'Error al actualizar la plantilla'
    });
    next();
}
module.exports = {
    verifyImg
}