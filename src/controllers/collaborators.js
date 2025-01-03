const readFile = require('../utils/readFile');
const separateRegisteredData = require('../utils/separateRegisteredData');
const getClientsToUpdate = require('../utils/getClientsToUpdate');
const { addType } = require('../utils/addType');
const Globals = require('../services/globals');

const insert = async (req, res) => {
  const { buffer } = req.file;
  let collaboratorsToInsert = readFile(buffer);
  Globals.getInfoDB(3,(err, info_db) => {
    if(err) return res.status(500).json({success:false, message:err});
    const idsDB =  info_db[0];
    const clientsDB = info_db[1];
    //Verificamos si hay matrículas registradas en la base de datos.
    if(idsDB.length) {
      //Separamos los maestros que tienen una matrícula que ya esta registrada en la base de datos de los que aun no estan registrados.
      var { toUpdate, withIdRegistered, notRegistered } = separateRegisteredData(3, idsDB, collaboratorsToInsert);
      collaboratorsToInsert = notRegistered;
      //Sacamos a los maestros que ya existen y que nada mas se van a actualizar
      var collaboratorsToUpdate = getClientsToUpdate('collaborators',toUpdate,clientsDB);
      if(!collaboratorsToInsert.length && !collaboratorsToUpdate.length) {
        return res.status(200).json({
          message:'Archivo cargado.', 
          registered:0, 
          updateds:0,
          inOtherSection:withIdRegistered
        });
      }
    }
    const result = addType(collaboratorsToInsert, 3);
    Globals.loadClients(result, collaboratorsToUpdate, (err, inserts) => {
      if(err) return res.status(500).json({success:false, message:err});
      return res.status(200).json({
        message:'Archivo cargado.',
        registered:inserts.clientsRegistered,
        updateds:inserts.clientsUpdated,
        //Los que existen pero pertenecen otra sección.
        inOtherSection:withIdRegistered??[]
      });
    });
  });
}
module.exports = {
  insert
};
