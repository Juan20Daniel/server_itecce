const Templates = require('../services/templates');

const getTamplates = async (req, res) => {
    try {
        const data = await Templates.selectAll();
        const tamplatesBase64 = data.map(tamplateDB => {
            return {
                ...tamplateDB,
                imgFront:tamplateDB.imgFront ? tamplateDB.imgFront.toString('base64') : null,
                imgReverse:tamplateDB.imgReverse ? tamplateDB.imgReverse.toString('base64') : null,
            }
        });
        res.status(200).json({
            message:'Plantillas de credenciales',
            tamplatesBase64
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Error al obtener las plantillas de credenciales', 
        });
    }
}
const updateTamplete = async (req, res) => {
    try {
        const idSection = req.params.idSection;
        const { type } = req.body;
        const file = req.file;
        const dataToUpdate = {
            imgBuffer: file ? file.buffer : null,
            type,
        }
        await Templates.update(dataToUpdate, idSection);
        res.status(200).json({
            message:'Se actualizo la plantilla de credencial de forma correcta',
            data:file ? file.buffer.toString('base64') : null
        });
    } catch (error) {
        console.log(error);
        const errorMessage = 'Error al actualizar la plantilla de credencial';
        res.status(500).json({message:errorMessage});
    }
}
module.exports = {
    getTamplates,
    updateTamplete
}