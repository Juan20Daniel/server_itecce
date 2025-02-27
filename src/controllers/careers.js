const Careers = require('../services/careers');

const getCareers = async (req, res) => {
    try {
        const career = await Careers.getAll();
        res.status(200).json({
            message:'Carreras registradas en la base de datos',
            data:career
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error al obtener las carreras de la base de datos'});
    }
}

const updateCareer = async (req, res) => {
    try {
        const { id, abridging, duration } = req.body;
        await Careers.update(id, abridging, duration);
        res.status(200).json({
            message:'Se actualizó la carrera de forma correcta',
            data:{ 
                id, 
                abridging, 
                duration 
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error al actualizar la carrera.'});
    }
}
const removeCareer = async (req, res) => {
    try {
        const { id } = req.params;
        await Careers.remove(id);
        res.status(200).json({
            message:'Se eliminó la carrera de forma correcta',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error al eliminar la carrera.'});
    }
}

module.exports = {
    getCareers,
    updateCareer,
    removeCareer
}