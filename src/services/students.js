const connection = require('../database/connection');
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
Students.insertStudent = (client, result) => {
  const { id,name,firstname,lastname,idSectionClients } = client;
  const sql = 'INSERT INTO clients (idClient, name, firstname, lastname, idSectionClients) VALUES(?,?,?,?,?)';
  connection.query(sql, [id,name,firstname,lastname,idSectionClients], (err, data) => {
    if(err) {
      result(err, null);
    } else {
      result(null, data);
    }
  });
}
Students.insertSchoolInfo = (person, result) => {
  const { id, area, group } = person;
  const sql = 'INSERT INTO infostudens (seccion,groupStudent,idClientInfo) VALUES(?,?,?)';
  connection.query(sql, [area, group, id], (err, data) => {
    if(err) {
      result(err, null);
    } else {
      result(null, data);
    }
  });
}

module.exports = Students;
