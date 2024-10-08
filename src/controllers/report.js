const Report = require('../services/report');
const { normalizeDate } = require('../utils/getDate');
const GetData = (req, res) => {
    const { section } = req.params;
    Report.getData(section, (err, reports) => {
        const data = reports.map(report => ({
            ...report,
            printed_at:normalizeDate(report.printed_at),
            delivered_at:report.delivered_at??'Sin entregar'
        }));
        if(err) return res.status(500).json({success:false, message:'Error al consultar el reporte de credenciales', error:err});
        res.status(200).json({
            success:true,
            message:'Registros de creación y entrega de credenciales',
            data
        });
    });
}

module.exports = {
    GetData
}