const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const path = require( 'path' )
const axios = require( 'axios' ).default
require( 'dotenv/config' );
// const dbConfig = require('./db/dbconf');

var app = express()
//define a url padrão para axios
axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    "Access-Control-Allow-Origin": "*"
}

// Set EJS engine como default para usar templates html
app.set( 'view engine', 'ejs' )

// Usa o body-parser para middleware
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( {
    extended: true
} ) )
app.use( express.static( path.join( __dirname, 'public' ) ) )


// Grupo de Rotas iniciais do Express
app.use( '/', require( './routes/index.route.js' ) )
app.use( '/user', require( './routes/user.route.js' ) )

// Set a port for the app to listen on
const PORT = process.env.PORT || 5005;

app.listen( PORT, function () {
    console.log( `Rodando na porta: ${PORT}. Press CTRL+C para sair.` )
} );