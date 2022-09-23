const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const { dbQuery } = require('../db/config');

const validarJWT = async( req = request, res = response, next ) => {

    const { SESSION_TOKEN } = req.cookies;

    //console.log( 'SESSION_TOKEN' , SESSION_TOKEN );

    const token = SESSION_TOKEN;


    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        console.log( 'uid:', uid );

        const [ respuesta ] = await dbQuery('SELECT * FROM usuarios WHERE uid = ?', uid );
        const usuario = { ...respuesta };

        const paresDeValores = Object.entries( usuario ).length;

        if( paresDeValores === 0 ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el uid tiene estado true
        /*
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }
        */
        
        
        req.usuario = usuario;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validarJWT
}