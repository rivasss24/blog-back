const  mysql = require('mysql') ;
//const dotenv = require('dotenv');
require('dotenv').config();
const { promisify } = require('util');

const database = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  charset: 'utf8mb4',
};

const pool = mysql.createPool( database );

const dbConnection = () => {
  pool.getConnection( ( err, connection ) => {
    if ( err ) {
      return console.log( err );
    }
  
    if ( connection ) {
      connection.release();
    }
  
    console.log('Bases de datos online');
  });
}

const dbQuery = promisify( pool.query ).bind( pool );

module.exports = {
  dbQuery,
  dbConnection
};
