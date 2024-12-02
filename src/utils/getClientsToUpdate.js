const checkName = (personDB, personFile) => {
    if(personDB.name != personFile['Nombre'] ||
    personDB.firstname != personFile['Apellido paterno'] ||
    personDB.lastname != personFile['Apellido materno']) {
        return true;
    }
    return false;
}
const checkDataSchool = (personDB, personFile) => {
    if(personDB.seccion != personFile['Sección'] ||
    personDB.groupStudent != personFile['Grupo']) {
        return true;
    }
    return false;
}
const getClientsToUpdate = (type, clientsFile, clientsDB) => {
    if(!clientsFile.length || !clientsDB.length) return [];
    let clientsToUpdate = [];
    clientsFile.forEach(clientFile => {
        let result = clientsDB.find(clientDB => clientDB.idClient === parseInt(clientFile['Matrícula']));
        if(type === 'students') {
            if(checkName(result, clientFile) || checkDataSchool(result, clientFile)) {
                clientsToUpdate.push(clientFile);
            }
        } else if(checkName(result, clientFile)) {
            clientsToUpdate.push(clientFile);
        }
    });
    return clientsToUpdate;
}

module.exports = getClientsToUpdate;