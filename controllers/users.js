const {
    default: axios
} = require( 'axios' );
const usersModel = require( '../model/users' );

/**
 * Requisição Express
 * Realiza o login do usuário criando a sessão e adicionando o parâmetro Authorization no header do axios
 * @param {*} req 
 * @param {*} res 
 * 
 */
exports.Login = async ( req, res ) => {

    const dados = await usersModel.Auth( req.body.username, req.body.senha );
    if ( dados.data.token.length > 0 ) {
        axios.defaults.headers.Authorization = 'Bearer ' + dados.data.token;
        const context = {
            title: "Login",
            data: dados.data,
        };
        res.render( "teste/view", context );
    } else {
        res.redirect( '/login' );
    }

};


exports.view = ( req, res ) => {
    const context = {
        title: "Fazer Login",
    };
    res.render( "index", context );
};