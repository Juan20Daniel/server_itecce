const connection = require('../model/model');
const {rollbackAsync, commitAsync, queryAsync, beginTransactionAsync } = require('../utils/mysql');
const getData = require('../utils/getDate');
const Students = {};

Students.getAll = (offset, result) => {
  const sql = "SELECT idPerson, name, firstname, lastname, avatar FROM persons WHERE typePerson='STUDENT' LIMIT 21 OFFSET ?";
  connection.query(sql, [offset], (err, students) => {
    if(err) {
      result(err, null);
    } else {
      result(null, students);
    }
  });
}
Students.getById = (id, offset, result) => {
  const sql = "SELECT idPerson, name, firstname, lastname, avatar FROM persons WHERE typePerson='STUDENT' AND CAST(idPerson AS CHAR) LIKE ? LIMIT 21 OFFSET ?";
  connection.query(sql, [`${id}%`,parseInt(offset)], (err, students) => {
    if(err) {
      result(err, null);
    } else {
      result(null, students);
    }
  });
}
Students.getByFullname = (name, firstname, lastname, offset, result) => {
  const sql = "SELECT idPerson, name, firstname, lastname, avatar FROM persons WHERE typePerson='STUDENT' AND name LIKE ? AND firstname LIKE ? AND lastname LIKE ? LIMIT 21 OFFSET ?";
  connection.query(sql, [`${name}%`,`${firstname}%`,`${lastname}%`,parseInt(offset)], (err, students) => {
    if(err) {
      result(err, null);
    } else {
      result(null, students);
    }
  });
}
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