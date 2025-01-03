const readFile = require('../utils/readFile');
const separateRegisteredData = require('../utils/separateRegisteredData');
const splitData = require('../utils/splitData');
const transformToArrays = require('../utils/transformToArrays');
const getClientsToUpdate = require('../utils/getClientsToUpdate');
const Students = require('../services/students');
const Globals = require('../services/globals');

const processExcel = (req, res) => {
    // const { buffer } = req.file;
    // let studensToInsert = readFile(buffer);
    // Globals.getInfoDB(1,(err, info) => {
    //     if(err) return res.status(500).json({success:false, message:err});
    //     //Separamos los alumnos con matrícula ya existente en la BD;
    //     const idsDB = info[0];
    //     const studentsDB = info[1];
    //     if(idsDB.length) {
    //         var {toUpdate, withIdRegistered, notRegistered} = separateRegisteredData(1, idsDB, studensToInsert);
    //         studensToInsert = notRegistered;
    //         var studentsToUpdate = getClientsToUpdate('students',toUpdate,studentsDB);
    //         if(!studensToInsert.length && !studentsToUpdate.length) {
    //             return res.status(200).json({
    //                 success:true,
    //                 message:'Archivo cargado.', 
    //                 registered:0,
    //                 updateds:0,
    //                 inOtherSection:withIdRegistered
    //             });
    //         }
    //     }
    //     // para continuar primero hay que insertar datos
    //     const { schoolData, personalData } = splitData(studensToInsert);
    //     const arraysPersonalData = transformToArrays(personalData);
    //     const arraysSchoolData = transformToArrays(schoolData);
    //     Students.insertStudents(arraysPersonalData, arraysSchoolData, studentsToUpdate, (err, result) => {
    //         if(err) return res.status(500).json({success:false, message:'Error desconocido', err});
    //         res.status(200).json({
    //             success:true, 
    //             message:'Archivo cargado.',
    //             registered:result.newStudents,
    //             updateds:result.updatedStudents,
    //             //Los que existen pero pertenecen otra sección.
    //             inOtherSection:withIdRegistered??[]
    //         });
    //     });
    // });
}


module.exports = {
    processExcel,
}