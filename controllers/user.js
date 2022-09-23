const { response } = require("express");
//const Usuario = require("../models/usuario");
const { dbQuery } = require('../db/config');

const bcryptjs = require("bcryptjs");

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const usuariosPost = async( req, res= response ) =>{
    let secureUrl = '';
    if( !!req.files === true ) {
        console.log( req.files );
        try {
            const { tempFilePath } = req.files.file
            const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
            secureUrl = secure_url;

        } catch (err) {
            console.log(err);
        }
    }

    const { nombre, correo, password, role }  = req.body;

    const salt = bcryptjs.genSaltSync( 11 );

    userPassword = bcryptjs.hashSync( password, salt);

    const usuario = { 
        userName : nombre,
        userEmail: correo,
        userPassword,
        userImg: secureUrl
    };

    try {
        await dbQuery('INSERT INTO usuarios SET ?', usuario );

        console.log( `Añadido:\n${ usuario }` );

        res.status(200).json({
            msg:'all good - post',
            usuario
        });

    } catch ( error ) {
        console.log( error );
        //Aqui colocare si fue un bad request
    }
}


const usuariosPut = ( req = require, res= response ) => {
    const { id } = req.params;
    
    res.json({
        msg: 'all good - put'
    });
}

const usuariosDelete = ( req = require, res= response ) => {
    res.json({
        msg: 'all good - delete'
    });
}

module.exports = {
    usuariosPost,
    usuariosPut,
    usuariosDelete
}