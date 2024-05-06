const {rollbackAsync, commitAsync, queryAsync, beginTransactionAsync } = require('../utils/mysql');
const Students = {};
const getData = require('../utils/getDate');
Students.insertStudents = async (personalData, schoolData, studentsToUpdate=[], result) => {
  try {
    await beginTransactionAsync();
    if(studentsToUpdate.length) {
      const fulldate = getData();
      let sql_persons = 'UPDATE persons SET name=?, firstname=?, lastname=?, updated_at=? WHERE idPerson = ?';
      let sql_school = 'UPDATE infoschool SET seccion=?, group_student=? WHERE idPerson_info = ?';
      studentsToUpdate.forEach(async (student) => {
        await queryAsync(sql_persons, [student['Nombre'], student['Apellido paterno'], student['Apellido materno'], fulldate, parseInt(student['Matrícula'])]);
        await queryAsync(sql_school, [student['Sección'], student['Grupo'], parseInt(student['Matrícula'])]);
      });
    }
    if(personalData.length) {
      const sql_personalData = 'INSERT INTO persons (idPerson,name,firstname,lastname,typePerson,avatar) VALUES ?';
      await queryAsync(sql_personalData, [personalData]);
      const sql_schoolData = 'INSERT INTO infoSchool (seccion, group_student, idPerson_info) VALUES ?';
      await queryAsync(sql_schoolData, [schoolData]);
    }
    await commitAsync();
    result(null, {newStudents:personalData.length, updatedStudents:studentsToUpdate.length});
  } catch(error) {
    result(error, null)
    await rollbackAsync();
  }
}

module.exports = Students;