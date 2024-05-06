const express = require('express');
const router = express.Router();
const fs = require('fs');

const pathRouter = `${__dirname}`;

const removeExtention = (filaName) => {
    return filaName.split('.').shift();
}

fs.readdirSync(pathRouter).filter((file) => {
    const fileWithOutExt = removeExtention(file);
    const skip = ['index'].includes(fileWithOutExt);
    if(!skip) {
        router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`));
    }
});

router.get('*', (req, res) => {
    res.status(404).json({message:'Route not found'});
});

module.exports = router;