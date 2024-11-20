const SchoolIdentityCard = require('../services/schoolIdentityCard');

const infoIdentityCard = (req, res) => {
    const idPerson = req.params.id;
    SchoolIdentityCard.getIdInfoById(idPerson, (err, info) => {
        if(err) return res.status(500).json({success:false, message:'Error al consultar la información de la credencial', error:err});
        let data = {
            ...info[0],
            typeCard:info[0]?.typePerson,
            isActive:info.length ? true : false
        }
        if(!data.isActive) data.idPerson = parseInt(idPerson);
        res.status(200).json({
            success:true,
            message:'Información escolar',
            data
        });
    });
}

module.exports = {
    infoIdentityCard,
}