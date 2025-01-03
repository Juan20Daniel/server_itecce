const {rollbackAsync, commitAsync, queryAsync, beginTransactionAsync } = require('../utils/mysql');
const Students = {};

Students.insertStudents = async (personalData, schoolData, studentsToUpdate=[], result) => {
  try {
    await beginTransactionAsync();
    if(studentsToUpdate.length) {
      let sql_update_personal_data = 'UPDATE clients SET name=?, firstname=?, lastname=? WHERE idClient = ?';
      let sql_update_school_data = 'UPDATE infostudens SET seccion=?, groupStudent=? WHERE idClientInfo = ?';
      studentsToUpdate.forEach(async (student) => {
        await queryAsync(sql_update_personal_data, [student['Nombre'], student['Apellido paterno'], student['Apellido materno'], parseInt(student['Matrícula'])]);
        await queryAsync(sql_update_school_data, [student['Sección'], student['Grupo'], parseInt(student['Matrícula'])]);
      });
    }
    if(personalData.length) {
      const sql_insert_personal_data = 'INSERT INTO clients (idClient,name,firstname,lastname,idSectionClients) VALUES ?';
      await queryAsync(sql_insert_personal_data, [personalData]);
      const sql_insert_school_data = 'INSERT INTO infostudens (seccion, groupStudent, idClientInfo) VALUES ?';
      await queryAsync( sql_insert_school_data, [schoolData]);
    }
    await commitAsync();
    result(null, {newStudents:personalData.length, updatedStudents:studentsToUpdate.length});
  } catch(error) {
    result(error, null)
    await rollbackAsync();
  }
}

module.exports = Students;