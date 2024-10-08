const connection = require('../database/connection');
const {rollbackAsync, commitAsync, queryAsync, beginTransactionAsync } = require('../utils/mysql');
const { getFullDate } = require('../utils/getDate');
const { getAvatar } = require('../utils/addTypeAndAvatar');
const Students = {};

Students.getAll = (offset, result) => {
  const sql = "SELECT idPerson, name, firstname, lastname, typePerson, avatar FROM persons WHERE typePerson='STUDENT' LIMIT 21 OFFSET ?";
  connection.query(sql, [offset], (err, students) => {
    if(err) {
      result(err, null);
    } else {
      result(null, students);
    }
  });
}
Students.getById = (id, offset, result) => {
  const sql = "SELECT idPerson, name, firstname, lastname, typePerson, avatar FROM persons WHERE typePerson='STUDENT' AND CAST(idPerson AS CHAR) LIKE ? LIMIT 21 OFFSET ?";
  connection.query(sql, [`${id}%`,parseInt(offset)], (err, students) => {
    if(err) {
      result(err, null);
    } else {
      result(null, students);
    }
  });
}
Students.getByFullname = (name, firstname, lastname, offset, result) => {
  const sql = "SELECT idPerson, name, firstname, lastname, typePerson, avatar FROM persons WHERE typePerson='STUDENT' AND name LIKE ? AND firstname LIKE ? AND lastname LIKE ? LIMIT 21 OFFSET ?";
  connection.query(sql, [`${name}%`,`${firstname}%`,`${lastname}%`,parseInt(offset)], (err, students) => {
    if(err) {
      result(err, null);
    } else {
      result(null, students);
    }
  });
}
Students.getNumTotal = (result) => {
  const sql = "SELECT COUNT(*) as total FROM persons WHERE typePerson='STUDENT'";
  connection.query(sql, (err, total) => {
    if(err) {
      result(err, null);
    } else {
      result(null, total[0].total);
    }
  });
}
Students.getInfoSchool = (id, result) => {
  const sql = 'SELECT idPerson_info, seccion, group_student FROM infoschool WHERE idPerson_info = ?';
  connection.query(sql, [id], (err, info) => {
    if(err) {
      result(err, null);
    } else {
      result(null, info);
    }
  });
}
Students.insertStudents = async (personalData, schoolData, studentsToUpdate=[], result) => {
  try {
    await beginTransactionAsync();
    if(studentsToUpdate.length) {
      const fulldate = getFullDate();
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
Students.insertStudent = (person, result) => {
  const { id,name,firstname,lastname,typePerson } = person;
  const sql = 'INSERT INTO persons ( idPerson, name, firstname, lastname, typePerson, avatar) VALUES(?,?,?,?,?,?)';
  connection.query(sql, [id,name,firstname,lastname,typePerson,getAvatar()], (err, data) => {
    if(err) {
      result(err, null);
    } else {
      result(null, data);
    }
  });
}
Students.insertSchoolInfo = (person, result) => {
  const { id, area, group } = person;
  const sql = 'INSERT INTO infoschool ( seccion, group_student, idPerson_info) VALUES(?,?,?)';
  connection.query(sql, [area, group, id], (err, data) => {
    if(err) {
      result(err, null);
    } else {
      result(null, data);
    }
  });
}
Students.remove = (id, result) => {
  const sql = 'DELETE FROM persons WHERE idPerson = ?'
  connection.query(sql, [id], (err, res) => {
    if(err) {
      result(err, null);
    } else {
      result(null, res.affectedRows);
    }
  });
}

module.exports = Students;