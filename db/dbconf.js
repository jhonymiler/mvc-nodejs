const {
    db
} = require( "pg" );

// Declare constants for the PostgreSQL Pool connection
const postgresUser = "crud_user";
const postgresDb = "crud_db";
const postgresPass = "1019";

var connectionString = `postgres://${postgresUser}:${postgresPass}@localhost:5432/${postgresDb}`;

const client = new db( {
    connectionString: connectionString,
} );
db.connect();

module.exports = db;