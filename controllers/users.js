const usersModel = require( '../model/users' );


exports.Login = async ( req, res ) => {

    const dados = await usersModel.Auth( req.body.username, req.body.senha );
    const context = {
        title: "Login",
        data: dados.data,
    };
    res.render( "teste/view", context );

};

exports.view = ( req, res ) => {
    const context = {
        title: "Fazer Login",
    };
    res.render( "index", context );
};


// exports.list = async ( req, res ) => {
//     const data = await usersModel.list();

//     const context = {
//         title: "Users",
//         data: data,
//     };
//     res.render( "users/list", context );
// };

// exports.view = async ( req, res ) => {
//     const data = await usersModel.view( req.params.id );
//     const context = {
//         title: "Users",
//         data: data,
//     };
//     res.render( "users/view", context );
// };