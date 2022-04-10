const axios = require( 'axios' ).default;

exports.Auth = async ( login, pass ) => {
    return await axios.post( '/login', {
        username: login,
        senha: pass
    } );
}

exports.Lista = async () => {
    const lista = await axios.get( '/user/listaUser' );
    if ( lista.data.length > 0 ) {
        return lista.data;
    } else {
        return [];
    }
}