const readFile = require('../utils/readFile');
const separateRegisteredData = require('../utils/separateRegisteredData');
const splitData = require('../utils/splitData');
const transformToArrays = require('../utils/transformToArrays');
const getClientsToUpdate = require('../utils/getClientsToUpdate');
const getRowsDB = require('../utils/getRowsDB');
const removeDuplicateCareers = require('../utils/removeDuplicateCareers');
const Careers = require('../services/careers');
const Clients = require('../services/clients');
const types = {
    'students':1,
    'teachers':2,
    'collaborators':3
}

const processCareers = async (excelData) => {
    try {
        let careersDB = await Careers.getCareers();
        const careersExcel = removeDuplicateCareers(excelData);
        if(!careersDB.length) {
            const rowsDB = getRowsDB(careersExcel);
            await Careers.saveCareers(rowsDB);
            careersDB = await Careers.getCareers();
            return careersDB;
        } 
        const careersArray = transformToArrays(careersDB).flat();
        const uniqueCareers = removeDuplicateCareers(careersArray, false).filter(item => typeof item === 'string');
        let newCareers = [];
        for(const career of careersExcel) {
            const searchResult = uniqueCareers.find(careerDB => careerDB===career);
            if(!searchResult) newCareers.push(career);
        }
        if(newCareers.length) {
            const rowsDB = getRowsDB(newCareers);
            await Careers.saveCareers(rowsDB);
            careersDB = await Careers.getCareers();
        }
        return careersDB;
    } catch (error) {
        console.log(error);
        throw new Error('No se logro procesar el archivo por un error al guardar las carreras');
    }
}

const processExcel = async (req, res) => {
    try {
        const { buffer } = req.file;
        const section = req.body.section;
        const typeSection = types[section];
        const idsDB = await Clients.getIds();
        const clientsDB = await Clients.getClientsByType(typeSection);
        let excelData = readFile(buffer);
        let careers = [];
        if(section === 'students') {
            careers = await processCareers(excelData);
        }
        if(idsDB.length) {
            //Separar clientes que ya están registrados en la base de datos de los que aún no.
            var {registered, withIdRegistered, notRegistered} = separateRegisteredData(typeSection, idsDB, excelData);
            excelData = notRegistered;
            //Para sacar a los clientes que ya existen y necesitan actualizarse.
            var clientsToUpdate = getClientsToUpdate(section,registered,clientsDB,careers);
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
        const {schoolData, personalData} = splitData(excelData, typeSection, careers);
        const resultPersonalData = transformToArrays(personalData);
        if(section === 'students') var resultSchoolData = transformToArrays(schoolData);
        //Guardar y actualizar los datos personales en la base de datos
        const result = await Clients.saveData(resultPersonalData, resultSchoolData, clientsToUpdate);
        res.status(200).json({
            message:'Archivo cargado.',
            news:result.news??0,
            updateds:result.updateds??0,
            inOtherSection:withIdRegistered??[]
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    processExcel
}