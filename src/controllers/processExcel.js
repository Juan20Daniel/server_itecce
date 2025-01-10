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
        if(section === 'students') var resultSchoolData = transformToArrays(schoolData);
        //Guardar y actualizar los datos personales en la base de datos
        const result = await Clients.saveData(resultPersonalData, resultSchoolData, clientsToUpdate, typeSection);
        res.status(200).json({
            message:'Archivo cargado.',
            news:result.news,
            updateds:result.updateds,
            inOtherSection:withIdRegistered??[]
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    processExcel
}