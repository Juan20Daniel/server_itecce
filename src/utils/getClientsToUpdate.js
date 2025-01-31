const verifyName = (clientDB, clientFile) => {
    let updateClient = null;
    if(clientDB.name !== clientFile['Nombre'] ||
    clientDB.firstname !== clientFile['Apellido paterno'] ||
    clientDB.lastname !== clientFile['Apellido materno']) {
        updateClient = {
            name:clientFile['Nombre'],
            firstname:clientFile['Apellido paterno'],
            lastname:clientFile['Apellido materno']
        }
    }
    return updateClient;
}
const verifySchoolData = (clientDB, clientFile, careers) => {
    let updateSchoolData = null;
    let idCareer = careers.find(career => career.fullname === clientFile['Sección']).idCareer;
    if(clientDB.idCareer !== idCareer || clientDB.groupStudent !== clientFile['Grupo']) {
        updateSchoolData = {
            groupStudent:clientFile['Grupo'],
            idCareerInfo:idCareer
        }
    }
    return updateSchoolData;
}
const getClientsToUpdate = (type, clientsFile, clientsDB, careers) => {
    if(!clientsFile.length || !clientsDB.length) return [];
    let clientsToUpdate = [];
    let resultVerifySchoolData = null;
    clientsFile.forEach(clientFile => {
        let clientToUpdate = {};
        let result = clientsDB.find(clientDB => clientDB.idClient === parseInt(clientFile['Matrícula']));
        clientToUpdate.idClient = result.idClient;
        let resultVerifyName = verifyName(result, clientFile);
        if(resultVerifyName) {
            clientToUpdate = {
                ...clientToUpdate,
                ...resultVerifyName
            }
        }
        if(type === 'students') {
            resultVerifySchoolData = verifySchoolData(result, clientFile, careers);
            if(resultVerifySchoolData) {
                clientToUpdate = {
                    ...clientToUpdate,
                    ...resultVerifySchoolData
                }
            }
        }
        if(resultVerifyName || resultVerifySchoolData) clientsToUpdate.push(clientToUpdate);
    });
    return clientsToUpdate;
}

module.exports = getClientsToUpdate;