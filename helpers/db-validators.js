
const { dbQuery } = require('../db/config');

const existeEmail = async( correo = '' ) => {
    const [ respuesta ] = await dbQuery("SELECT userEmail FROM usuarios WHERE userEmail = ?", correo );
    const { userEmail }  = { ...respuesta };

    if( userEmail ){
        console.log("El usuario ya existe");
        throw new Error(`El correo que ingreso ya se encuentra registrado`);
    }

}

const existeIdDeUsuario = async( id ) => {
    //const existeId = await Usuarios.findOne({ id });
    const [ respuesta ] = await dbQuery("SELECT uid FROM usuarios WHERE uid = ?", id );
    const { uid } = { ...respuesta };ç
    console.log( uid ); 
    /*
    if( !existeId ){
        throw new Error(`El usuario ingresado no existe`);
    }
    */
}


const existePost = async ( postID ) => {
    const [ respuesta ] = await dbQuery("SELECT id FROM posts WHERE id = ?", postID );
    
    const { id } = { ...respuesta };
    
    if( !id ){
        throw new Error(`No se encontro un post asosiado al id`);
    }
}


module.exports = {
    existeEmail,
    existeIdDeUsuario,
    existePost
}