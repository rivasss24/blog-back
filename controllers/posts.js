const { response } = require("express");
const { dbQuery } = require('../db/config');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const obtenerPostById = async( req = require , res = response  ) => {
    const { id } = req.params;

    //const post = await dbQuery( "SELECT * FROM posts WHERE id = ?", id );
    const [ respuesta ] = await dbQuery( "SELECT * FROM posts INNER JOIN usuarios ON posts.uid = usuarios.uid WHERE id = ?", id);
    const post = { ...respuesta };

    res.json({
        post
    });
}


const obtenerPost = async( req = require , res = response ) => {

    /*
    const { limite = 50 , desde = 0 } = req.query;
    */

    const posts = await dbQuery('SELECT * FROM posts INNER JOIN usuarios ON posts.uid = usuarios.uid');

    res.json({
        //total,
        posts
    });

}

const guardarPost = async( req = require , res = response ) => {
    
    let secureUrl = '';

    if( !! req.files === true ){
        try {
            const { tempFilePath } = req.files.file
            const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
            secureUrl = secure_url;

        } catch (err) {
            console.log(err);
        }
    }

    const { title, description, contenido } = req.body;
    
    const post = {
        postTitle: title,
        postDescription: description,
        postContent:contenido,
        uid: req.usuario.uid,
        postImg: secureUrl
    }

    try {
        await dbQuery('INSERT INTO posts SET ?', post );

        console.log( 'post añadido' , post );
    
        res.json({
            msg: 'todo bien posteando el post',
            post
        });
    } catch (error) {
        console.log( error );
    }

}


module.exports = {
    guardarPost,
    obtenerPost,
    obtenerPostById
}