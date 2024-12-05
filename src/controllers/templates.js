const Templates = require('../services/templates');

const getTamplates = (req, res) => {
    Templates.selectAll((err, data) => {
        if(err) {
            return res.status(500).json({
                success:false, 
                message:'Error al obtener las plantillas de credenciales', 
                error:err
            });
        }
        const tamplatesBase64 = data.map(tamplateDB => {
            return {
                ...tamplateDB,
                imgFront:tamplateDB.imgFront ? tamplateDB.imgFront.toString('base64') : null,
                imgReverse:tamplateDB.imgReverse ? tamplateDB.imgReverse.toString('base64') : null,
            }
        });
        res.status(200).json({
            success:true,
            message:'Plantillas de credenciales',
            tamplatesBase64
        });
    });
}
const updateTamplete = (req, res) => {
    const { type, idSection } = req.body;
    const imgBuffer = req.file.buffer;
    Templates.update(imgBuffer, type, idSection, (err, data) => {
        if(err) {
            const errorMessage = 'Error al actualizar la plantilla de credencial';
            return res.status(500).json({success:false, message:errorMessage, error:err});
        }
        return res.status(200).json({
            success:true,
            message:'Se actualizo la plantill de credencial'
        });
    });
}
module.exports = {
    getTamplates,
    updateTamplete
}