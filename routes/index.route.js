var express = require( 'express' );
var router = express.Router();
const userController = require( '../controllers/users' );

/* GET home page. */
// router.get( '/', function ( req, res, next ) {
//     res.render( 'index', {
//         title: 'ACX'
//     } );
// } );

router.get( '/', function ( req, res, next ) {
    res.redirect( '/login' )
} );

router.get( '/login', userController.view );
router.post( '/login', userController.Login );

module.exports = router;