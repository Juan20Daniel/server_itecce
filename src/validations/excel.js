const readFile = require('../utils/readFile');
const { expretions } = require('../utils/expretions'); 

const requireKeys = (section) => {
    const keys = {
        students: [
            'Sección',
            'Grupo',
            'Matrícula',
            'Nombre',
            'Apellido paterno',
            'Apellido materno'
        ],
        teachers: [
            'Nombre',
            'Matrícula',
            'Apellido paterno',
            'Apellido materno'
        ],
        collaborators: [
            'Nombre',
            'Matrícula',
            'Apellido paterno',
            'Apellido materno'
        ]
    }
    return keys[section]??false;
}
const verifyKeys = (data, section) => {
    const keys = requireKeys(section);
    if(!keys) return false;
    const result = keys.filter(key => !Object.keys(data[0]).includes(key));
    return !result.length;
}
const chackIds = (data) => {
    const ids = data.map(data => data['Matrícula']);
    const uniqueItems = new Set(ids);
    if(uniqueItems.size === ids.length) return false;
    for(const itemToSearch of uniqueItems) {
        let result = data.filter(item => item['Matrícula'] === itemToSearch);
        if(result.length > 1) {
            return result[0]['Matrícula']
        }
    }
}
const verifyExcel = (req, res, next) => {
    if(!req.file) return res.status(500).json({message:'No se ha adjuntado ningun archivo.'});
    const { originalname, buffer } = req.file;
    const { section } = req.body;
    if(!expretions.fullname.test(originalname)) return res.status(500).json({message:'El archivo no es válido, verifica que el nombre no tenga acentos.'});
    const dataExcel = readFile(buffer);
    if(dataExcel.length === 0) return res.status(500).json({message:'El archivo esta vacío.'});
    if(!verifyKeys(dataExcel, section)) return res.status(500).json({message:'Hay un error con la información del archivo.'});
    const hasDulicates = chackIds(dataExcel);
    if(hasDulicates) return res.status(500).json({message:`La matrículas ${hasDulicates} esta repetida en el archivo.`});
    next();
}
module.exports = {
    verifyExcel,
}