const readFile = require('../utils/readFile');
const separateRegisteredData = require('../utils/separateRegisteredData');
const splitData = require('../utils/splitData');
const transformToArrays = require('../utils/transformToArrays');
const getClientsToUpdate = require('../utils/getClientsToUpdate');
const Students = require('../services/students');
const Clients = require('../services/clients');
const types = {
    'students':1,
    'teachers':2,
    'collaborators':3
}
const processExcel = async (req, res) => {
    try {
        const { buffer } = req.file;
        const section = req.body.section;
        const typeSection = types[section];
        const idsDB = await Clients.getIds();
        const clientsDB = await Clients.getClientsByType(typeSection);
        let excelData = readFile(buffer);

        if(idsDB.length) {
            var {toUpdate, withIdRegistered, notRegistered} = separateRegisteredData(typeSection, idsDB, excelData);
            studensToInsert = notRegistered;
            var studentsToUpdate = getClientsToUpdate('students',toUpdate,studentsDB);
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
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error al procesar el archivo'});
    }
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