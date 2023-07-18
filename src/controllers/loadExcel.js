const createConnection = require('../model/model');

const multier = require('multer');
const xlsx = require('xlsx');
const storage = multier.memoryStorage();
const upload = multier({
  storage,
  fileFilter: (req, file, cb) => {
    if(!file.originalname.toUpperCase().includes('.XLSX')) {
      return res.status(500).json({error:'Invalid file!!'});
    } else {
      cb(null, true);
    }
  }
})
const loader = upload.single('excelFile');

function splitProperties(data) {
  var array_clients = [];
  var array_dataSchool = [];
  for(let i=0; i<=data.length - 1; i++) {
    var data_client = { 
      matricula:data[i]['Matrícula'], 
      name:data[i].Nombre, 
      firstname:data[i]['Apellido paterno'], 
      lastname:data[i]['Apellido materno'],
      user_algeb:data[i]['Nombre de usuario'],
      typeClient:'student'
    }
    array_clients.push(Object.values(data_client));
    var data_dataSchool = { idDataSchool:null, section:data[i]['Sección'], mrupo:data[i].Grupo, matricula:data[i]['Matrícula'] }
    array_dataSchool.push(Object.values(data_dataSchool));
  }
  return { clients:array_clients, dataSchool:array_dataSchool }
}

function resetData(fileContent) {
  const workbook = xlsx.read(fileContent);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(worksheet);
  return data;
}

async function insertData(data) {
  const connection = await createConnection();
  try {
    await connection.beginTransaction();
    const sqlClients = `INSERT INTO clients VALUES ${data.clients.map(() => '(?,?,?,?,?,?)').join(', ')}`;
    const sqlDataSchool = `INSERT INTO dataSchool VALUES ${data.dataSchool.map(() => '(?,?,?,?)').join(', ')}`;
    await connection.execute(sqlClients, data.clients.flat());
    await connection.execute(sqlDataSchool, data.dataSchool.flat());
    await connection.commit();
  } catch (error) {0.
    await connection.rollback();
    console.log('Failed the insert in the database:', error);
    return false
  } finally {
    await connection.end();
    return true;
  }
}

function checkExistsId(dataFile, dataDB) {
  console.log(dataDB)
  console.log(dataFile)
  // for(let i=0; i<=dataFile.length - 1; i++) {
  //   for(let z=0; z<=dataDB.length - 1; z++) {
  //     if(dataFile.) {

  //     }
  //   }
  // }
}
 
const loadExcel = async (req, res) => {
  if(!req.file.originalname.toUpperCase().includes('.XLSX')) return res.status(500).json({error:'El archivo debe ser un documento de Excel'});
  try {
    const connection = await createConnection();
    const [ rows, fielts ] = await connection.execute('SELECT group_studen, idclient_d FROM dataSchool');
    await connection.end();
    const resultResetData = resetData(req.file.buffer);
    if(rows.length === 0) {
      const result = splitProperties(resultResetData);
      const resultConsult = await insertData(result);
      if(resultConsult) return res.status(200).json({ message:"Archivo cargado!!", error:false});
      return res.status(500).json({ message:"Error al cargar el archivo", error:true});
    }
    checkExistsId(resultResetData, rows);
    return res.status(200).json({ message:"Procesando datos...", error:false});
  } catch (error) {
    res.status(500).json({message:'Error al hacer la consulta.', error});
  }
}

module.exports = {
  loader,
  loadExcel
};