const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();
const db_link = "mongodb://localhost/clients";
const options={
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(db_link,options).then(function(){
    console.log("MongoDB is connected");
}).catch(function(err){
    console.log(err)
});
//importing routes
const routes = require('./routes/index');


//settings
app.set('port',process.env.PORT || 8081);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

//routes
app.use('/',routes);

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Docker CRUD",
            description: "Lab de docker",
            contact: {
                name: "fabianes96"
            },
            servers: ["http://localhost:8081"]
        }
    },
    apis: ["./src/app.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Define request response in root URL (/)
app.get('/', function (req, res) {
    res.send('Success');
})
/**
* @swagger
* /clients:
*  get:
*    description: Use to request all clients
*    responses:
*      '200':
*        description: A successful response
*/
app.get('/clients', function (req, res) {
    res.status(200).send('Client results')
})
/**
* @swagger
* /editar/{id}:
*   put:
*     description: Use to update a client
*     parameters:
*       - name: id
*         description: client's id
*         in: path
*         required: true
*       - name: nombre
*         description: client's name
*         in: formData
*         required: false
*         type: string
*       - name: apellido
*         description: client's last name
*         in: formData
*         required: false
*         type: string
*       - name: email
*         description: client's email
*         in: formData
*         required: false
*         type: string
*   responses:
*     '200':
*       description: A successful response
*/
/**
* @swagger
* /agregar:
*   post:
*     description: Use to add a client
*     parameters:
*       - name: nombre
*         description: Nombre del cliente
*         in: formData
*         required: false
*         schema:
*           type: string
*           format: string
*       - name: apellido
*         description: Apellido del cliente
*         in: formData
*         required: false
*         schema:
*           type: string
*           format: string
*       - name: email
*         description: Email del cliente
*         in: formData
*         required: false
*         schema:
*           type: string
*           format: string
*   responses:
*     '200':
*       description: Redirect
*/
/**
* @swagger
* /edit/{id}:
*  get:
*    description: Lleva a formulario para editar 
*    parameters:
*       - name: id
*         description: id del cliente
*         in: path
*         required: true
*         schema:
*           type: string
*           format: string*     
*    responses:
*      '200':
*        description: A successful response
*/
/**
* @swagger
* /:
*  get:
*    description: Use to request all clients
*    responses:
*      '200':
*        description: A successful response
*/
/**
* @swagger
* /eliminar/{id}:
*   delete:
*     description: Eliminar un cliente
*     parameters:
*       - name: id
*         description: client's id
*         in: path
*         required: true
*   responses:
*     '200':
*       description: A successful response
*/


app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`)
})