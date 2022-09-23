const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../db/config.js');
const cookieParser = require('cookie-parser');


//const port = process.env.PORT; 

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth:        '/auth',
            usuarios :   '/usuarios',
            posts:        '/posts'
        }


        //Connect to database

        this.conectarDB();

        //Middlewares
        this.middleware();

        this.routes();


    }

    conectarDB(){
        dbConnection();
    }

    middleware(){

        this.app.use( express.static('public') );

        this.app.use(cors({
            origin:'http://localhost:5173',
            credentials: true,
          }));

        this.app.use( express.json() );

        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

        this.app.use(cookieParser());

    }

    routes(){
        this.app.use( this.path.usuarios, require('../routes/user.js'));
        this.app.use( this.path.auth, require('../routes/auth'));
        this.app.use( this.path.posts, require('../routes/posts'));
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Escuchando en el puerto:', this.port );
        });
    }
}

module.exports = Server;