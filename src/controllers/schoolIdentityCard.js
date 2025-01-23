const SchoolIdentityCard = require('../services/schoolIdentityCard');
const typeClients = [
    'student',
    'teacher',
    'collaborator'
]
const infoIdentityCard = async (req, res) => {
    try {
        const idClient = req.params.id;
        const result = await SchoolIdentityCard.getIdInfoById(idClient);
        let data = {
            ...result[0],
            typeClient:typeClients[result[0]?.idSectionClients-1],
            typeCard:result[0]?.type,
            //Para saber si se le puede hacer la credencial o no
            isActive:result.length ? true : false
        }
        if(!data.isActive) data.idClient = parseInt(idClient);
        res.status(200).json({
            message:'Información para credencial escolar',
            data
        });   
    } catch (error) {
        console.log(error);
        const errorMessage = 'Error al consultar la información de la credencial'
        return res.status(500).json({message:errorMessage});
    }
}

module.exports = {
    infoIdentityCard
}