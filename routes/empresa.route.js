import {
    db
} from "../db/dbconf";

exports.empresas = function ( req, res ) {
    db.query( "SELECT * FROM empresa", function ( err, result ) {
        if ( err ) {
            console.log( err );
            res.status( 400 ).send( err );
        }
        res.render( "empresa/empresas", {
            title: "empresa",
            data: result.rows
        } );
    } );
};

exports.view = function ( req, res ) {
    var id = req.params.id;
    db.query( "SELECT * FROM empresa WHERE id=$1", [ id ], function ( err, result ) {
        if ( err ) {
            console.log( err );
            res.status( 400 ).send( err );
        }
        res.render( "empresa/view", {
            title: "empresa",
            data: result.rows
        } );
    } );
};


exports.add = function ( req, res ) {
    res.render( "empresa/add", {
        title: "Add empresa"
    } );
};


exports.edit = function ( req, res ) {
    // Pega a o registro pela ID
    var id = req.params.id;

    db.query( "SELECT * FROM empresa WHERE id=$1", [ id ], function (
        err,
        result
    ) {
        if ( err ) {
            console.log( err );
            res.status( 400 ).send( err );
        }
        res.render( "empresa/edit", {
            title: "Edit empresa",
            data: result.rows
        } );
    } );
};

exports.save = function ( req, res ) {
    var cols = [ req.body.name, req.body.email, req.body.address, req.body.phone ];

    db.query(
        "INSERT INTO empresa(name, email, address, phone) VALUES($1, $2, $3, $4) RETURNING *",
        cols,
        function ( err, result ) {
            if ( err ) {
                console.log( "Error. Not Saved! : %s ", err );
            }
            res.redirect( "/empresa/empresas" );
        }
    );
};

exports.update = function ( req, res ) {
    // Colunas da tabela no PostgreSQL
    var cols = [
        req.body.name,
        req.body.email,
        req.body.address,
        req.body.phone,
        req.params.id
    ];

    db.query(
        "UPDATE empresa SET name=$1, email=$3, address=$2, phone=$4 WHERE id=$5",
        cols,
        function ( err, result ) {
            if ( err ) {
                console.log( "Error. Updating : %s ", err );
            }
            res.redirect( "/empresa/empresas" );
            console.log( result );
        }
    );
    // console.log(cols, id);
};

exports.delete = function ( req, res ) {
    var id = req.params.id;

    db.query( "DELETE FROM empresa WHERE id=$1", [ id ], function ( err, rows ) {
        if ( err ) {
            console.log( "Error deleting : %s ", err );
        }
        res.redirect( "/empresa/empresas" );
    } );
};