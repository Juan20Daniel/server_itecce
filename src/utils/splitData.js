const splitData = (clients, type, careers) => {
    let schoolData = [];
    let personalData = [];
    if(clients.length) {
        clients.forEach(client => {
            personalData.push({
                idPerson:client['Matrícula'], 
                name:client['Nombre'], 
                firstname:client['Apellido paterno'],
                lastname:client['Apellido materno'],
                idSectionClients:type,
            });
            if(type === 1) {
                schoolData.push({
                    groupclient:client['Grupo'],
                    idCareerInfo:careers.find(career =>  career.fullname === client['Sección']).idCareer,
                    idClientInfo:client['Matrícula']
                });
            }
        });
    }
    return {schoolData, personalData};
}

module.exports = splitData;