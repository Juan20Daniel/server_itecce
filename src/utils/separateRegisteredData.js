
const separateRegisteredData = (type, idsDB, clientsToInsert) => {
    let notFounds = [];
    let founds = [];
    let toUpdate = [];
    clientsToInsert.forEach(client => {
        let result = idsDB.find(id => id.idClient === parseInt(client['Matrícula']));
        if(!result) {
            notFounds.push(client);
        } else if(result.idSectionClients === type) {
            toUpdate.push(client);
        } else {
            founds.push(client);
        }
    });
    return {toUpdate, withIdRegistered:founds, notRegistered:notFounds};
}

module.exports = separateRegisteredData;