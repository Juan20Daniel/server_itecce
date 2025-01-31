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

module.exports = {
    getCareers
}