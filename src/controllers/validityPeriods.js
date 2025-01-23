const ValidityPeriods = require('../services/validityPeriods');
const getValidityPeriods = async (req, res) => {
    try {
        const result = await ValidityPeriods.selectAll();
        res.status(200).json({
            message:'Vigencia de las credenciales.',
            data:result
        });
    } catch (error) {
        console.log(error);
        const errorMessage = 'Error al consultar la vigencia de las credenciales';
        res.status(500).json({message:errorMessage});
    }
}
const updateValidityPeriods = async (req, res) => {
    try {
        const { students, teachers, collaborators } = req.body;
        const result = await ValidityPeriods.updateAll({students, teachers, collaborators});
        res.status(200).json({message:result});
    } catch (error) {
        console.log(error);
        const errorMessage = 'Error al actualizar la vigencia de las credenciales';
        res.status(500).json({message:errorMessage});
    }
}
module.exports = {
    getValidityPeriods,
    updateValidityPeriods
}