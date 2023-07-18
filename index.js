const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use((express.static(path.join(__dirname, 'src/images'))));

app.use('/api', require('./src/routes/routes'));

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON THE PORT: ",PORT);
});