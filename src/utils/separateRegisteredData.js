
const separateRegisteredData = (type, idsDB, clientsToInsert) => {
    let notFounds = [];
    let founds = [];
    let registered = [];
    clientsToInsert.forEach(client => {
        let result = idsDB.find(id => id.idClient === parseInt(client['Matrícula']));
        if(!result) {
            //Separamos los que no existen
            notFounds.push(client);
        } else if(result.idSectionClients === type) {
            //Los que se pueden actualizar
            registered.push(client);
        } else {
            //Los que estan registrados en otra sección
            founds.push(client);
        }
    });
    return {registered, withIdRegistered:founds, notRegistered:notFounds};
}

module.exports = separateRegisteredData;