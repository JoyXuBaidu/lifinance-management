const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const mainRouter = require('./routes/main');
const homeRouter = require('./routes/home');
const registerRouter = require('./routes/register');
const addRecordRouter = require('./routes/addrecord');

const app =new express();

app.use(express.static(path.join(__dirname,'resources'))); // Get Static resources
app.use(bodyParser.urlencoded({ extended: false })); // Get the body of request of POST

app.use(mainRouter);
app.use(homeRouter);
app.use(registerRouter);
app.use(addRecordRouter);

app.listen(3000);