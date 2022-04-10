exports.isAuthorized = ( req, res, next ) => {

    if ( !req.session.user ) {
        return res.redirect( '/login' )
        next();

    } else {
        res.locals.user = req.session.user;
        next();
    }
}