require('./models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const orderController = require('./controllers/orderController');

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/gfg'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

var app =express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,'/public')));
app.set('views',path.join(__dirname,'views'));
app.engine('hbs',exphbs({
    extname:'hbs',
    defaultlayout:'main',
    layoutsDir:__dirname + '/views/'
}));
app.set('view engine','hbs');
app.listen(3000, ()=>{
    console.log('connect to port:3000');
});
app.use('/',orderController); 
