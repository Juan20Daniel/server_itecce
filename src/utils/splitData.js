const splitData = (clients, type) => {
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
                    seccion:client['Sección'],
                    groupclient:client['Grupo'],
                    idClientInfo:client['Matrícula']
                });
            }
        });
    }
    return {schoolData, personalData};
}

module.exports = splitData;