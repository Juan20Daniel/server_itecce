const splitData = (students) => {
    let schoolData = [];
    let personalData = [];
    students.forEach(student => {
        personalData.push({
            idPerson:student['Matrícula'], 
            name:student['Nombre'], 
            firstname:student['Apellido paterno'],
            lastname:student['Apellido materno'],
            idSectionClients:1,
        });
        schoolData.push({
            seccion:student['Sección'],
            groupStudent:student['Grupo'],
            idClientInfo:student['Matrícula']
        });
    });
    return {schoolData, personalData};
}

module.exports = splitData;