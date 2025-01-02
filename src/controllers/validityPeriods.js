const ValidityPeriods = require('../services/validityPeriods');
const getValidityPeriods = async (req, res) => {
    try {
        const result = await ValidityPeriods.selectAll();
        res.status(200).json({
            success:true,
            message:'Vigencia de las credenciales.',
            data:result
        });
    } catch (error) {
        const errorMessage = 'Error al consultar la vigencia de las credenciales';
        res.status(500).json({success:false, message:errorMessage, error:err});
    }
}
const updateValidityPeriods = async (req, res) => {
    try {
        const { students, teachers, collaborators } = req.body;
        const result = await ValidityPeriods.updateAll({students, teachers, collaborators});
        res.status(200).json({
            success:true,
            message:result,
        });
    } catch (error) {
        res.status(500).json({success:false, message:error.message});
    }
}
module.exports = {
    getValidityPeriods,
    updateValidityPeriods
}