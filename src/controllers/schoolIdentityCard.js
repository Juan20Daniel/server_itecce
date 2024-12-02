const SchoolIdentityCard = require('../services/schoolIdentityCard');

const infoIdentityCard = (req, res) => {
    const idClient = req.params.id;
    SchoolIdentityCard.getIdInfoById(idClient, (err, info) => {
        if(err) return res.status(500).json({success:false, message:'Error al consultar la información de la credencial', error:err});
        let data = {
            ...info[0],
            typeCard:info[0]?.type,
            //Para saber si se le puede hacer la credencial o no
            isActive:info.length ? true : false
        }
        if(!data.isActive) data.idClient = parseInt(idClient);
        res.status(200).json({
            success:true,
            message:'Información para credencial escolar',
            data
        });
    });
}

module.exports = {
    infoIdentityCard,
}