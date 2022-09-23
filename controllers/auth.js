const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { dbQuery } = require("../db/config");
const { generarJWT } = require('../helpers/generar-jwt');

const login = async ( req = require , res = response ) => {
    
    const { correo, password } = req.body;

    try {
        
        const userEmail = correo; 

        const [ respuesta ] = await dbQuery('SELECT * FROM usuarios WHERE userEmail = ?', userEmail );
        
        const usuarioExiste = { ...respuesta };

        const paresDeValores = Object.entries( usuarioExiste ).length;

        if( paresDeValores === 0 ){
        return res.status(400).json({
                msg: "Correo o contraseña incorrectos"
            });
        }

        /*
        if( !usuarioExiste.estado ){
            return res.status(400).json({
                msg: "El usuario ingresado fue eliminado"
            });
        }
        */

        const contraseñaValida = bcryptjs.compareSync( password, usuarioExiste.userPassword );

        if( !contraseñaValida ){
            return res.status(400).json({
                msg: "Correo o contraseña incorrectos"
            })
        }

        const token = await generarJWT( usuarioExiste.uid );

        if( token ){
        res.status(200).cookie('SESSION_TOKEN', token ).json({
            logged: true 
        }); 
        }

    } catch (error) {
        //aqui van los errores
        console.log(error);
    }
}

const logOut = async ( req, res ) => {
    res.status(200).clearCookie('SESSION_TOKEN').json({
        logged: false,
    });
  };

const verificar = ( req, res ) => {
    const { SESSION_TOKEN } = req.cookies;
    if( SESSION_TOKEN ){
        //console.log('estas logeado');
        res.json({
            logged: true
        });
    } else {
        //console.log('no estas logeado');
        res.json({
            logged: false
        });
    }
}

module.exports = { 
    login, 
    logOut,
    verificar
};