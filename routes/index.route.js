var express = require( 'express' );
var router = express.Router();
const userController = require( '../controllers/users' );
const Auth = require( '../middlewares/auth' );

router.get( '/', Auth.isAuthorized, function ( req, res ) {
    res.render( 'index', {
        title: "Página Inicial"
    } );
} );

router.get( '/login', ( req, res ) => {
    res.render( 'login', {
        title: "Página de Login"
    } );
} );

router.post( '/login', userController.Login );
router.get( '/logout', userController.Logout );

module.exports = router;