
require('dotenv').config();
const express = require('express');

class Server{
    constructor(){
        this.app = express();
        //MIDDELWARES  
        this.app.use( express.json() );
        this.middlewares();
        /////////

        this.routes();
        //this.listen();
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
        this.app.use( express.static('public'));
    }
}

module.exports = Server;