const express = require( 'express' );
const router = express.Router();
const userController = require( '../controllers/users' );
const Auth = require( '../middlewares/auth' );


router.get( '/lista', Auth.isAuthorized, userController.Lista );

module.exports = router;