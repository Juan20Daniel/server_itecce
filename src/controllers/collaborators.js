const readFile = require('../utils/readFile');
const {addTypeAndAvatar} = require('../utils/addTypeAndAvatar');
const separateRegisteredData = require('../utils/separateRegisteredData');
const getPersonsToUpdate = require('../utils/getPersonsToUpdate');
const Globals = require('../services/globals');

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

module.exports = {
  insert
};
