const ValidityPeriods = require('../services/validityPeriods');
const getValidityPeriods = (req, res) => {
    ValidityPeriods.selectAll((err, data) => {
        if(err) {
            const errorMessage = 'Error al consultar la vigencia de las credenciales';
            return res.status(500).json({success:false, message:errorMessage, error:err});
        }
        return res.status(200).json({
          success:true,
          message:'Vigencia de las credenciales.',
          data
        });
    });
}
const updateValidityPeriods = (req, res) => {
    const { students, teachers, collaborators } = req.body;
    ValidityPeriods.updateAll({students, teachers, collaborators}, (err, result) => {
        if(err) {
            const errorMessage = 'Error al actualizar la vigencia de las credenciales'
            return res.status(500).json({success:false, message:errorMessage, error:err});
        }
        return res.status(200).json({
          success:result,
          message:'Se actualizo la vigencia de las credenciales.',
        });
    });
}
module.exports = {
    getValidityPeriods,
    updateValidityPeriods
}