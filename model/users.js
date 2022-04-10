const axios = require( 'axios' ).default;

exports.Auth = async ( login, pass ) => {
    return await axios.post( '/login', {
        username: login,
        senha: pass
    } );
}