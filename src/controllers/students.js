const readFile = require('../utils/readFile');
const separateRegisteredData = require('../utils/separateRegisteredData');
const splitData = require('../utils/splitData');
const transformToArrays = require('../utils/transformToArrays');
const getPersonsToUpdate = require('../utils/getPersonsToUpdate');
const Students = require('../services/students');
const Globals = require('../services/globals');

const getAll = (req, res) => {
    const offset = req.query.offset;
    Students.getAll(parseInt(offset), (err, students) => {
        if(err) return res.status(500).json({success:false, message:err});
        const nextPage = students.length === 21 ? parseInt(offset) + 20 : false;
        if(students.length === 21) students.pop();
        res.status(200).json({
            success:true,
            message:'Cantidad de alumnos: '+students.length, 
            nextPage,
            data:students
        });
    });
}
const getById = (req, res) => {
    const offset = req.query.offset;
    const id = req.params.id;
    Students.getById(id, offset, (err, students) => {
        if(err) return res.status(500).json({success:false, message:err});
        const nextPage = students.length === 21 ? parseInt(offset) + 20 : false;
        if(students.length === 21) students.pop();
        res.status(200).json({
            success:true,
            message:'Cantidad de alumnos: '+students.length,
            nextPage,
            data:students
        });
    });
}
const getByFullname = (req, res) => {
    const offset = req.query.offset;
    const fullname = req.params.fullname.split('-');
    Students.getByFullname(fullname[0], fullname[1], fullname[2], offset, (err, students) => {
        if(err) return res.status(500).json({success:false, message:err});
        const nextPage = students.length === 21 ? parseInt(offset) + 20 : false;
        if(students.length === 21) students.pop();
        res.status(200).json({  
            success:true, 
            message:'Cantidad de alumnos: '+students.length, 
            nextPage,
            data:students
        });
    });
}
const insert = (req, res) => {
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
module.exports = {
    getAll,
    getById,
    getByFullname,
    insert
}