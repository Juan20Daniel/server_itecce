const SchoolIdentityCard = require('../services/schoolIdentityCard');
const typeClients = [
    'student',
    'teacher',
    'collaborator'
]
const infoIdentityCard = (req, res) => {
    const idClient = req.params.id;
    SchoolIdentityCard.getIdInfoById(idClient, (err, info) => {
        if(err) {
            const errorMessage = 'Error al consultar la información de la credencial'
            return res.status(500).json({success:false, message:errorMessage, error:err});
        }
        let data = {
            ...info[0],
            typeClient:typeClients[info[0]?.idSectionClients-1],
            typeCard:info[0]?.type,
            //Para saber si se le puede hacer la credencial o no
            isActive:info.length ? true : false
        }
        if(!data.isActive) data.idClient = parseInt(idClient);
        res.status(200).json({
            message:'Información para credencial escolar',
            data
        });
    });
}

module.exports = {
    infoIdentityCard,
}