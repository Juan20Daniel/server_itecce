const SchoolIdentityCard = require('../services/schoolIdentityCard');
const {getCurrentDate, normalizeDate } = require('../utils/getDate');

const infoIdentityCard = (req, res) => {
    const idPerson = req.params.id;
    SchoolIdentityCard.getIdInfoById(idPerson, (err, info) => {
        if(err) return res.status(500).json({success:false, message:'Error al consultar la información de la credencial', error:err});
        let data = {
            ...info[0],
            isActive:info.length ? true : false
        }
        if(!data.isActive) data.idPerson = parseInt(idPerson);
        res.status(200).json({
            success:true,
            message:'Información escolar',
            data
        });
    });
}
const GetDate = (req, res) => {
    SchoolIdentityCard.getDate((err, data) => {
        console.log(err);
        if(err) return res.status(500).json({success:false, message:err});
        res.status(200).json({
            success:true,
            message:'Registros de entrega y creación de credenciales.',
            data
        });
    });
}
const GetDateById = (req, res) => {
    const id = req.params.id;
    SchoolIdentityCard.getDateById(id, (err, data) => {
        if(err) return res.status(500).json({success:false, message:err});
        if(!data.length) return res.status(200).json({success:false, message:'No hay datos', data:{printed_at:null, delivered_at:null}});
        res.status(200).json({
            success:true,
            message:'Registro de entrega y creación de credencial',
            printed_at: normalizeDate(data[0].printed_at),
            delivered_at: normalizeDate(data[0].delivered_at)
        });
    });
}
const ProcessPrintDate = (req, res) => {
    const ids = req.body;
    var dataToUpdate = [];
    var dataToInsert = ids;
    const date = getCurrentDate();
    SchoolIdentityCard.getDate((err, dataDB) => {
        if(err) return res.status(500).json({success:false, message:err});
        if(dataDB.length) {
            dataToInsert = [];
            ids.forEach(id => {
                let result = dataDB.find(data => data.idPerson_ident === id);
                result ? dataToUpdate.push(result) : dataToInsert.push(id);
            });
            
        }
        if(dataToInsert.length !== 0) {
            const data = dataToInsert.map(id => {
                return [date, null, id]
            });
            dataToInsert = data;
        }
        SchoolIdentityCard.processPrintDate(dataToInsert, dataToUpdate, date, (err, result) => {
            if(err) return res.status(500).json({success:false, message:err});
            res.status(200).json({
                success:true,
                message:result
            });
        });
    });
}

const InsertDate = (req, res) => {
    const { id, date } = req.body;
    SchoolIdentityCard.insertDate(id, date, (err, result) => {
        if(err) return res.status(500).json({success:false, message:'No se logro guardar la fecha.', error:err});
        res.status(200).json({
            success:true,
            message:'Se ha guardado la fecha de forma correcta.',
        });
    });
}

const UpdateDate = (req, res) => {
    const { id } = req.params;
    const { date, fieldToUpdate } = req.body;
    SchoolIdentityCard.updateDate(id, date, fieldToUpdate, (err, result) => {
        if(err) return res.status(500).json({success:false, message:'No se logro guardar la fecha.', error:err});
        res.status(200).json({
            success:true,
            message:'Se ha guardado la fecha de forma correcta.',
        });
    });
}
module.exports = {
    infoIdentityCard,
    GetDate,
    GetDateById,
    ProcessPrintDate,
    InsertDate,
    UpdateDate
}