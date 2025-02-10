const Careers = require('../services/careers');

const getCareers = async (req, res) => {
    try {
        const career = await Careers.getCareers();
        res.status(200).json({
            message:'Carreras registradas en la base de datos',
            data:career
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error al obtener las carreras de la base de datos'});
    }
}

const updateAbridging = async (req, res) => {
    try {
        const { id, abridging } = req.body;
        await Careers.updateAbridging(id, abridging);
        res.status(200).json({
            message:'Se actualizo la abreviatura de la carrera',
            data:{ id, abridging }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error al actualizar la abreviatura.'});
    }
}


module.exports = {
    getCareers,
    updateAbridging
}