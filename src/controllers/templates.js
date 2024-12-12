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
    const idSection = req.params.idSection;
    const { type } = req.body;
    const file = req.file;
    const dataToUpdate = {
        imgBuffer: file ? file.buffer : null,
        type,
    }
    Templates.update(dataToUpdate, idSection, (err, dataDB) => {
        if(err) {
            const errorMessage = 'Error al actualizar la plantilla de credencial';
            return res.status(500).json({success:false, message:errorMessage, error:err});
        }
        return res.status(200).json({
            success:true,
            message:'Se actualizo la plantilla de credencial de forma correcta',
            data:file ? file.buffer.toString('base64') : null
        });
    });
}
module.exports = {
    getTamplates,
    updateTamplete
}