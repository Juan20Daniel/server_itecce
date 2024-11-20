const readFile = require('../utils/readFile');
const separateRegisteredData = require('../utils/separateRegisteredData');
const getPersonsToUpdate = require('../utils/getPersonsToUpdate');
const Globals = require('../services/globals');
const Collaborators = require('../services/collaborators');
const {addTypeAndAvatar} = require('../utils/addTypeAndAvatar');

const insert = async (req, res) => {
  const { buffer } = req.file;
  let collaboratorsToInsert = readFile(buffer);
  Globals.getInfoDB('COLABORATOR',(err, info_db) => {
    if(err) return res.status(500).json({success:false, message:err});
    const idsDB =  info_db[0];
    const personsDB = info_db[1];
    //Verificamos si hay matrículas registradas en la base de datos.
    if(idsDB.length) {
      //Separamos los maestros que tienen una matrícula que ya esta registrada en la base de datos de los que aun no estan registrados.
      var { toUpdate, withIdRegistered, notRegistered } = separateRegisteredData('COLABORATOR', idsDB, collaboratorsToInsert);
      collaboratorsToInsert = notRegistered;
      //Sacamos a los maestros que ya existen y que nada mas se van a actualizar
      var collaboratorsToUpdate = getPersonsToUpdate('collaborators', toUpdate, personsDB);
      if(!collaboratorsToInsert.length && !collaboratorsToUpdate.length) {
        return res.status(200).json({
          success:true, 
          message:'Archivo cargado.', 
          registered:0, 
          updateds:0,
          inOtherSection:withIdRegistered
        });
      }
    }
    const result = addTypeAndAvatar(collaboratorsToInsert, 'COLABORATOR');
    Globals.loadPersons(result, collaboratorsToUpdate, (err, inserts) => {
      if(err) return res.status(500).json({success:false, message:err});
      return res.status(200).json({
        success:true,
        message:'Archivo cargado.',
        registered:inserts.personsRegistered,
        updateds:inserts.personsUpdated,
        //Los que existen pero pertenecen otra sección.
        inOtherSection:withIdRegistered??[]
      });
    });
  });
}
const insertCollaborator = (req, res) => {
  const { person } = req.body;
  Collaborators.insertCollaborator(person, (err, result) => {
    if(err) return res.status(500).json({success:false, message:'No se logro insetar', error:err});
    return res.status(200).json({
      success:true,
      message:'Se agrego de forma correcta.'
    });
  });
}
module.exports = {
  insert,
  insertCollaborator,
};
