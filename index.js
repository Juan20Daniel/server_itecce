require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const PORT = process.env.PORT;
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const v1Routes = require('./src/v1Routes');
const Keys = require('./src/config/secretKeyJwt');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(cors());
app.use(session({
    secret: Keys.secretKeyJwt,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require('./src/config/passport')(passport);
app.disable('x-powerd-by');
app.set('port', PORT);
app.use('/api/v1', v1Routes);

server.listen(PORT, 'localhost', () => {
    console.log("SERVER IS RUNNING ON THE PORT: ",PORT);
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json(err.stack);
})