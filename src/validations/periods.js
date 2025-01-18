const { expretions } = require('../utils/expretions'); 
const verifyFields = (fields) => {
    const requireFields = ['students', 'teachers', 'collaborators'];
    for(let i=0; i<=requireFields.length-1; i++) {
        if(!fields.includes(requireFields[i])) return false;
    }
    return true;
}
const verifyValues = (values) => {
    for(let i=0; i<=values.length-1; i++) {
        if(!expretions.period.test(values[i])) return false;
    }
    return true;
}
const verifyPeriods = (req, res, next) => {
    if(!verifyFields(Object.keys(req.body))) return res.status(500).json({
        message:'Error al actualizar el periodo'
    });
    if(!verifyValues(Object.values(req.body))) return res.status(500).json({
        message:'Error al actualizar el periodo'
    });
    next();
}
module.exports = {
    verifyPeriods
}