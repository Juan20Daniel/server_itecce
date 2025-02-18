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

const updateCareer = async (req, res) => {
    try {
        const { id, abridging, duration } = req.body;
        await Careers.updateCareer(id, abridging, duration);
        res.status(200).json({
            message:'Se actualizo la carrera de forma correcta',
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


module.exports = {
    getCareers,
    updateCareer
}