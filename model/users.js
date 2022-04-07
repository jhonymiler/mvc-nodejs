const axios = require( 'axios' ).default;

exports.Auth = async ( username, senha ) => {

    resultado = await axios.post( '/login/', {
        'username': username,
        'senha': senha
    }, );

    console.log( resultado )
}