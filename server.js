const path = require('path');
const express = require('express');

const mainRouter = require('./routes/main');
const homeRouter = require('./routes/home');
const expressHbs = require('express-handlebars');

const app =new express();

app.engine('hbs',expressHbs());
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname,'resources'))); // Get Static resources
app.use(mainRouter);
app.use(homeRouter);

app.listen(3000);