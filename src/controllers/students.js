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

const getNumTotal = (req, res) => {
    Students.getNumTotal((err, result) => {
        if(err) return res.status(500).json({
            success:false, 
            message:'Error al consultar el total de registros',
            error:err
        });
        res.status(200).json({  
            success:true, 
            message:'Cantidad total de alumnos', 
            total:result
        });
    });
}
const getInfoScrool = (req, res) => {
    const id = req.params.id;
    Students.getInfoSchool(id, (err, result) => {
        if(err) return res.status(500).json({success:false, message:'Al consultar la información escolar.', err});
        res.status(200).json({
            success: true,
            message: 'Información escolar',
            data: result
        });
    });
}
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
const remove = (req, res) => {
    const { id } = req.params;
    Students.remove(id, (err, result) => {
        if(err) return res.status(500).json({success:false, message:'No se logro eliminar por un error en el servidor', error:err});
        return res.status(200).json({
            success:true, 
            message:'El alumno se a eliminado de forma correcta.'
        });
    });
}
module.exports = {
    getAll,
    getById,
    getNumTotal,
    getInfoScrool,
    insertStudents,
    insertStudent,
    remove
}