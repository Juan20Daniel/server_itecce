const readFile = require('../utils/readFile');
const separateRegisteredData = require('../utils/separateRegisteredData');
const splitData = require('../utils/splitData');
const transformToArrays = require('../utils/transformToArrays');
const getPersonsToUpdate = require('../utils/getPersonsToUpdate');
const Students = require('../services/students');
const Globals = require('../services/globals');

const insertStudents = (req, res) => {
    const { buffer } = req.file;
    let studensToInsert = readFile(buffer);
    Globals.getInfoDB('STUDENT',(err, info) => {
        if(err) return res.status(500).json({success:false, message:err});
        //Separamos los alumnos con matrícula ya existente en la BD;
        const idsDB = info[0];
        const studentsDB = info[1];
        if(idsDB.length) {
            var {toUpdate, withIdRegistered, notRegistered} = separateRegisteredData('STUDENT', idsDB, studensToInsert);
            studensToInsert = notRegistered;
            var studentsToUpdate = getPersonsToUpdate('students',toUpdate, studentsDB);
            if(!studensToInsert.length && !studentsToUpdate.length) {
                return res.status(200).json({
                    success:true, 
                    message:'Archivo cargado.', 
                    registered:0, 
                    updateds:0,
                    inOtherSection:withIdRegistered
                });
            }
        }
        // para continuar primero hay que insertar datos
        const { schoolData, personalData } = splitData(studensToInsert);
        const arraysPersonalData = transformToArrays(personalData);
        const arraysSchoolData = transformToArrays(schoolData);
        Students.insertStudents(arraysPersonalData, arraysSchoolData, studentsToUpdate, (err, result) => {
            if(err) return res.status(500).json({success:false, message:'Error desconocido', err});
            res.status(200).json({
                success:true, 
                message:'Archivo cargado.',
                registered:result.newStudents,
                updateds:result.updatedStudents,
                 //Los que existen pero pertenecen otra sección.
                inOtherSection:withIdRegistered??[]
            });
        });
    });
}
const insertStudent = (req, res) => {
    const { person } = req.body;
    Students.insertStudent(person, (err, result) => {
        if(err) return res.status(500).json({success:false, message:'No se logro insetar', error:err});
        Students.insertSchoolInfo(person, (err, result) => {
            if(err) return res.status(500).json({success:false, message:'No se logro insetar', error:err});
            return res.status(200).json({
                success:true,
                message:'Se agrego de forma correcta.'
            });
        });
    });
}

module.exports = {
    insertStudents,
    insertStudent,
}