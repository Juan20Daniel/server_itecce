const readFile = require('../utils/readFile');
const expretions = {
    fullname:/^[a-zA-Z_0-9 ]{5,30}.(XLSX|xlsx|XLS|xls)$/,
    offset:/^[0-9]{1,15}$/,
    id:/^[0-9]{1,7}$/,
    fullname_search:/^[A-ZÁÉÍÓÚÑ -]{1,40}$/
}
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
const verifyFile = (req, res, next) => {
    if(!req.file) return res.status(500).json({success:false, message:'No se ha adjuntado ningun archivo.'});
    const { originalname, buffer } = req.file;
    const { section } = req.body;
    if(!expretions.fullname.test(originalname)) return res.status(500).json({success:false, message:'El archivo no es válido, verifica que el nombre no tenga acentos.'});
    const dataExcel = readFile(buffer);
    if(dataExcel.length === 0) return res.status(500).json({success:false, message:'El archivo esta vacío.'});
    if(!verifyKeys(dataExcel, section)) return res.status(500).json({success:false, message:'Hay un error con la información del archivo.'});
    const hasDulicates = chackIds(dataExcel);
    if(hasDulicates) return res.status(500).json({success:false, message:`La matrículas ${hasDulicates} esta repetida en el archivo.`});
    next();
}
const verifyOffset = (req, res, next) => {
    if(!req.query.hasOwnProperty('offset')) return res.status(500).json({success:false, message:'La url no es válida.'});
    const offset = req.query.offset;
    if(!expretions.offset.test(parseInt(offset))) return res.status(500).json({success:false, message:'El rango no es válido.'});
    next();
}
const verifyId = (req, res, next) => {
    const id = req.params.id;
    if(!expretions.id.test(id)) {
        res.status(500).json({success:false, message:'La matrícula no es válida.'});
    }
    next();
}
const verifyFullname = (req, res, next) => {
    const fullname = req.params.fullname;
    if(!expretions.fullname_search.test(fullname)) return res.status(500).json({success:false, message:'El nombre no es válida.'});
    next();
}
module.exports = {
    verifyFile,
    verifyOffset,
    verifyId,
    verifyFullname
}