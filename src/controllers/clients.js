const Clients = require('../services/clients');

const removeClientsByType = async (req, res) => {
    try {
        const { type } = req.params;
        await Clients.removeClientsByType(parseInt(type));
        res.status(200).json({
            message:'Se eliminaron los registros de forma correcta.',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error al eliminar los registros'});
    }
}
const removeAllClients = async (req, res) => {
    try {
        await Clients.removeAll();
        res.status(200).json({
            message:'Se eliminaron los registros de forma correcta.',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error al eliminar los registros'});
    }
}
module.exports = {
    removeClientsByType,
    removeAllClients
}