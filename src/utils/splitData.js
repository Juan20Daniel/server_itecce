const { getAvatar } = require('./addTypeAndAvatar');
const splitData = (students) => {
    let schoolData = [];
    let personalData = [];
    students.forEach(student => {
        personalData.push({
            idPerson:student['Matrícula'], 
            name:student['Nombre'], 
            firstname:student['Apellido paterno'],
            lastname:student['Apellido materno'],
            type:'STUDENT',
            avatar:getAvatar()
        });
        schoolData.push({
            seccion:student['Sección'],
            group_student:student['Grupo'],
            idPer_infoStuden:student['Matrícula']
        });
    });
    return {schoolData, personalData};
}

module.exports = splitData;