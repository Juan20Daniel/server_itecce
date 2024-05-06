const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth');
const { check } = require('../validations/auth');

router.get('/:username/:password', check, login);
//router.post('/', Auth.create);

module.exports = router;

// const express = require('express');
// const route = express.Router();
// const { upload, loadExcel } = require('../controllers/loadExcel');
// const getStudens = require('../controllers/getStudens');
// const { moveImage, registerImage } = require('../controllers/setImage');
// const deleteImg = require('../controllers/deleteImg');

// route.get('/get-studens', getStudens);
// route.post('/load-excel', upload.single('excelFile'), loadExcel);
// route.post('/set-image', moveImage, registerImage);
// route.post('/delete-img', deleteImg);

// module.exports = route;