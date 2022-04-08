const usersModel = require( '../model/users' );


exports.Login = ( req, res ) => {
    const context = {
        title: "Login",
        data: usersModel.Auth( req.body.username, req.body.senha ),
    };
    res.render( "teste/view", context );
};

exports.view = async ( req, res ) => {
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