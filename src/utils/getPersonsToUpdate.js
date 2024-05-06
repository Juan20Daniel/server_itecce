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
    personDB.group_student != personFile['Grupo']) {
        return true;
    }
    return false;
}
const getPersonsToUpdate = (typePersons, personsFile, personsDB) => {
    if(!personsFile.length || !personsDB.length) return [];
    let personsToUpdate = [];
    personsFile.forEach(personsFile => {
        let result = personsDB.find(personDB => personDB.idPerson === parseInt(personsFile['Matrícula']));
        if(typePersons === 'students') {
            if(checkName(result, personsFile) || checkDataSchool(result, personsFile)) {
                personsToUpdate.push(personsFile);
            }
        } else if(checkName(result, personsFile)) {
            personsToUpdate.push(personsFile);
        }
    });
    return personsToUpdate;
}

module.exports = getPersonsToUpdate;