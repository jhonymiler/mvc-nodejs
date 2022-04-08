const axios = require( 'axios' ).default;

exports.Auth = async ( login, pass ) => {
    try {
        const resposta = await axios.post( 'teste.php', {
            username: login,
            senha: pass
        } );

        axios.defaults.headers.common[ 'Authorization' ] = AUTH_TOKEN;

        return resposta.data;
    } catch ( error ) {
        console.log( error );
    }
}