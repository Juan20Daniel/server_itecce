const ValidityPeriods = require('../services/validityPeriods');
const getValidityPeriods = (req, res) => {
    ValidityPeriods.selectAll((err, data) => {
        if(err) return res.status(500).json({success:false, message:'Error al consultar la vigencia de las credenciales', error:err});
        return res.status(200).json({
          success:true,
          message:'Vigencia de las credenciales.',
          data
        });
    })
}

module.exports = {
    getValidityPeriods
}   