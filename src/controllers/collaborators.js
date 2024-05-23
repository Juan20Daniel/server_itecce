const readFile = require('../utils/readFile');
const separateRegisteredData = require('../utils/separateRegisteredData');
const getPersonsToUpdate = require('../utils/getPersonsToUpdate');
const Globals = require('../services/globals');
const Collaborators = require('../services/collaborators');
const {addTypeAndAvatar} = require('../utils/addTypeAndAvatar');


const getAll = (req, res) => {
  const offset = req.query.offset;
  Collaborators.getAll(parseInt(offset), (err, collaborators) => {
    if(err) return res.status(500).json({success:false, message:err});
    const nextPage = collaborators.length === 21 ? parseInt(offset) + 20 : false;
    if(collaborators.length === 21) collaborators.pop();
    res.status(200).json({
      success:true,
      message:'Cantidad de colaboradores: '+collaborators.length, 
      nextPage,
      data:collaborators
    });
  });
}
const getById = (req, res) => {
  const offset = req.query.offset;
  const id = req.params.id;
  Collaborators.getById(id, offset, (err, collaborators) => {
    if(err) return res.status(500).json({success:false, message:err});
    const nextPage = collaborators.length === 21 ? parseInt(offset) + 20 : false;
    if(collaborators.length === 21) collaborators.pop();
    res.status(200).json({
      success:true,
      message:'Cantidad de colaboradores: '+collaborators.length,
      nextPage,
      data:collaborators
    });
  });
}
const getByFullname = (req, res) => {
  const offset = req.query.offset;
  const fullname = req.params.fullname.split('-');
  Collaborators.getByFullname(fullname[0], fullname[1], fullname[2], offset, (err, collaborators) => {
    if(err) return res.status(500).json({success:false, message:err});
    const nextPage = collaborators.length === 21 ? parseInt(offset) + 20 : false;
    if(collaborators.length === 21) collaborators.pop();
    res.status(200).json({  
      success:true, 
      message:'Cantidad de colaboradores: '+collaborators.length, 
      nextPage,
      data:collaborators
    });
  });
}
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
  getAll,
  getById,
  getByFullname,
  insert
};
