const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

mongoose.connect('mongodb://localhost/clients')
    .then(db => console.log("db conectada"))
    .catch(err => console.log(err))
//importing routes
const routes = require('./routes/index');


//settings
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

//routes
app.use('/',routes);


app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`)
})