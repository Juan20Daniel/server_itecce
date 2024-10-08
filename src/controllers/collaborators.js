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
const getNumTotal = (req, res) => {
  Collaborators.getNumTotal((err, result) => {
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
const remove = (req, res) => {
  const { id } = req.params;
  Collaborators.remove(id, (err, result) => {
    if(err) return res.status(500).json({success:false, message:'No se logro eliminar por un error en el servidor', error:err});
    return res.status(200).json({
      success:true, 
      message:'El colaborador se a eliminado de forma correcta.'
    });
  });
}

module.exports = {
  getAll,
  getById,
  getByFullname,
  getNumTotal,
  insert,
  insertCollaborator,
  remove 
};
