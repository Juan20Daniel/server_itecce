const readFile = require('../utils/readFile');
const separateRegisteredData = require('../utils/separateRegisteredData');
const getClientsToUpdate = require('../utils/getClientsToUpdate');
const Teachers = require('../services/teachers');
const Globals = require('../services/globals');
const {addType} = require('../utils/addType');

const insert = async (req, res) => {
  const { buffer } = req.file;
  let teachersToInsert = readFile(buffer);
  Globals.getInfoDB(2,(err, info_db) => {
    if(err) {
      const errorMessage = 'Error al consultar la información'
      return res.status(500).json({success:false, message:errorMessage, error:err});
    }
    const idsDB =  info_db[0];
    const clientsDB = info_db[1];
    //Verificamos si hay matrículas registradas en la base de datos.
    if(idsDB.length) {
      //Separamos los maestros que tienen una matrícula que ya esta registrada en la base de datos de los que aun no estan registrados.
      var { toUpdate, withIdRegistered, notRegistered } = separateRegisteredData(2, idsDB, teachersToInsert);
      teachersToInsert = notRegistered;
      //Sacamos a los maestros que ya existen y que nada mas se van a actualizar
      var teachersToUpdate = getClientsToUpdate('teachers',toUpdate,clientsDB);
      if(!teachersToInsert.length && !teachersToUpdate.length) {
        return res.status(200).json({
          success:true,
          message:'Archivo cargado.',
          registered:0,
          updateds:0,
          inOtherSection:withIdRegistered
        });
      }
    }
    const result = addType(teachersToInsert, 2);
    Globals.loadClients(result, teachersToUpdate, (err, inserts) => {
      if(err) return res.status(500).json({success:false, message:err});
      return res.status(200).json({
        success:true,
        message:'Archivo cargado.',
        registered:inserts.clientsRegistered,
        updateds:inserts.clientsUpdated,
        //Los que existen pero pertenecen otra sección.
        inOtherSection:withIdRegistered??[]
      });
    });
  });
}
const insertTeacher = async (req, res) => {
  try {
    const { person } = req.body;
    await Teachers.insertTeacher(person);
    res.status(200).json({
      message:'Se agregó de forma correcta.'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'No se logro insetar'});
  }
}

module.exports = {
  insert,
  insertTeacher
};
