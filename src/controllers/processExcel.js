const readFile = require('../utils/readFile');
const separateRegisteredData = require('../utils/separateRegisteredData');
const splitData = require('../utils/splitData');
const transformToArrays = require('../utils/transformToArrays');
const getClientsToUpdate = require('../utils/getClientsToUpdate');
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
            //Separar clientes que ya están registrados en la base de datos de los que aún no.
            var {registered, withIdRegistered, notRegistered} = separateRegisteredData(typeSection, idsDB, excelData);
            excelData = notRegistered;
            //Para sacar a los clientes que ya existen y necesitan actualizarse.
            var clientsToUpdate = getClientsToUpdate(section,registered,clientsDB);
            if(!excelData.length && !clientsToUpdate.length) {
                return res.status(200).json({
                    message:'Archivo cargado.', 
                    news:0,
                    updateds:0,
                    inOtherSection:withIdRegistered
                });
            }
        }
        //Separar los datos escolares de los alumnos nuevos
        const {schoolData, personalData} = splitData(excelData, typeSection);
        const resultPersonalData = transformToArrays(personalData);
        //Guardar y actualizar los datos personales en la base de datos
        const result = await Clients.savePersonalData(resultPersonalData, clientsToUpdate);
        //En caso de que sean alumnos los que se están cargando, guardar y actualizar los datos escolares en la base de datos.
        if(section === 'students') {
            var resultSchoolData = transformToArrays(schoolData);
            await Clients.saveSchoolData(resultSchoolData, clientsToUpdate);
        }
        res.status(200).json({
            message:'Archivo cargado.',
            result,
            inOtherSection:withIdRegistered??[]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error al procesar el archivo'});
    }
}

const processExcel_test = async (req, res) => {
    try {
        const { buffer } = req.file;
        const section = req.body.section;
        const typeSection = types[section];
        const idsDB = await Clients.getIds();
        const clientsDB = await Clients.getClientsByType(typeSection);
        let excelData = readFile(buffer);
        if(idsDB.length) {
            //Separar clientes que ya están registrados en la base de datos de los que aún no.
            var {registered, withIdRegistered, notRegistered} = separateRegisteredData(typeSection, idsDB, excelData);
            excelData = notRegistered;
            //Para sacar a los clientes que ya existen y necesitan actualizarse.
            var clientsToUpdate = getClientsToUpdate(section,registered,clientsDB);
            if(!excelData.length && !clientsToUpdate.length) {
                return res.status(200).json({
                    message:'Archivo cargado.', 
                    news:0,
                    updateds:0,
                    inOtherSection:withIdRegistered
                });
            }
        }
        //Separar los datos escolares de los alumnos nuevos
        const {schoolData, personalData} = splitData(excelData, typeSection);
        const resultPersonalData = transformToArrays(personalData);
        //Guardar y actualizar los datos personales en la base de datos
        if(section === 'students') var resultSchoolData = transformToArrays(schoolData);
        
        const result = await Clients.saveData(resultPersonalData, resultSchoolData, clientsToUpdate);
        //En caso de que sean alumnos los que se están cargando, guardar y actualizar los datos escolares en la base de datos.
        res.status(200).json({
            message:'Archivo cargado.',
            result,
            inOtherSection:withIdRegistered??[]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error al procesar el archivo'});
    }
}


module.exports = {
    processExcel,
    processExcel_test
}