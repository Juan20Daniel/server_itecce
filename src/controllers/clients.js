const Clients = require('../services/clients');
const getLastClients = (req, res) => {
    const { type, offset } = req.query;
    Clients.getClients(type, parseInt(offset), (err, page) => {
        if(err) return res.status(500).json({success:false, message:'Error al obtener los últimos clientes.', error:err});
        //Si hay menos de 21, significa que no hay más registros que consultar.
        const next = page.length === 21 ? parseInt(offset) + 20 : false;
        //Para que en la página tenga solo 20 registros, eliminamos el último, si el resultado es 21
        if(page.length === 21) page.pop();
        res.status(200).json({
            success:true,
            message:'Página con '+page.length+' registros', 
            next,
            data:page
        });
    });
}

module.exports = {
    getLastClients
}