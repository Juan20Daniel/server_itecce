
const separateRegisteredData = (typePerson, idsDB, personsToInsert) => {
    let notFounds = [];
    let founds = [];
    let toUpdate = [];
    personsToInsert.forEach(person => {
        let result = idsDB.find(item => item.idPerson === parseInt(person['Matrícula']));
        if(!result) {
            notFounds.push(person);
        } else if(result.typePerson === typePerson) {
            toUpdate.push(person);
        } else {
            founds.push(person);
        }
    });
    return {toUpdate, withIdRegistered:founds, notRegistered:notFounds};
}

module.exports = separateRegisteredData;