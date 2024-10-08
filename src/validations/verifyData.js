const expretions = {
    id: /^[0-9]{7}$/,
    name: /^[A-Z ÁÉÍÓÚÑ]{5,20}$/,
    firstname: /^[A-Z ÁÉÍÓÚÑ]{5,20}$/,
    lastname: /^[A-Z ÁÉÍÓÚÑ]{5,20}$/,
    group: /^[A-Z0-9 -/]{5,15}$/,
    area: /^[A-Z ÁÉÍÓÚ]{10,50}$/
}

const verifyData = (req, res, next) => {
    if(!req.body.person) return res.status(500).json({success:false, message:'Error al agregar.'});
    const { id, name, firstname, lastname, area='', group='', typePerson=null } = req.body.person;
    if(!typePerson) return res.status(500).json({success:false, message:'Tipo no definido'});
    if(!expretions.id.test(id) ||
    !expretions.name.test(name) ||
    !expretions.firstname.test(firstname) ||
    !expretions.lastname.test(lastname)) {
        return res.status(500).json({success:false, message:'Los datos no son correctos.'});
    }
    if(typePerson !== 'STUDENT') next();
    if(!expretions.area.test(area) || !expretions.group.test(group)) {
        return res.status(500).json({success:false, message:'Los datos no son correctos.'});
    }
    next();
}

module.exports = {
    verifyData
}