
require("@babel/register");



const express = require("express");

const config = require('./config/serverConfig');

const indexRouter = require('./routes/index.route');

const app = express();

// app.locals.title =''

config(app);

app.use('/', indexRouter);

app.listen(3000, () => { console.log('Стартуюю') });