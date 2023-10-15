
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        //MIDDELWARES  
        this.app.use( express.json() );

        this.conectarDb();
        
        this.middlewares();
        /////////

        this.routes();
        //this.listen();
    }
    
    async conectarDb(){
        await dbConnection();
    }

    routes(){
            this.app.use('/respuestaXml', require('../routes/pruebas'));
    }

    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log('proceso corriendo en', process.env.PORT)
        })
    }

    middlewares(){
        this.app.use( cors('*'));
        this.app.use( express.static('public'));
    }
}

module.exports = Server;