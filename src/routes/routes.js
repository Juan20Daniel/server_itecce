const express = require('express');
const route = express.Router();
const { loader, loadExcel } = require('../controllers/loadExcel');
const getStudens = require('../controllers/getStudens');
const { moveImage, registerImage } = require('../controllers/setImage');
const deleteImg = require('../controllers/deleteImg');

route.get('/get-studens', getStudens);
route.post('/load-excel', loader, loadExcel);
route.post('/set-image', moveImage, registerImage);
route.post('/delete-img', deleteImg);
module.exports = route;