// var url = require('url');
// var pg = require('pg');
//
// if(process.env.DATABASE_URL) {
//  var params = url.parse(process.env.DATABASE_URL);
//  var auth = params.auth.split(':');
//
//  var config = {
//    user: auth[0],
//    password: auth[1],
//    host: params.hostname,
//    port: params.port,
//    database: params.pathname.split('/')[1],
//    ssl: true
//  };
// } else {
//  var config = {
//    database: 'psp_database', // the name of the database
//    host: 'localhost', // where is your database
//    port: 5432, // the port number for your database
//    max: 10, // how many connections at one time
//    idleTimeoutMillis: 30000 // 30 seconds to try to connect
//  };
// }
//
// module.exports = new pg.Pool(config);



var pg = require('pg');
var url = require('url');
var config = {};

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
  var params = url.parse(process.env.DATABASE_URL);
  var auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // heroku requires ssl to be true
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };

} else {
  config = {
    user: process.env.User || null, //env var: PGUSER
    password: process.env.Password || null, //env var: PGPASSWORD
    host: process.env.Host || 'localhost', // Server hosting the postgres database
    port: process.env.DATABASE_PORT || 5432, //env var: PGPORT
    database: process.env.Database || 'phi', //env var: PGDATABASE
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
}

module.exports = new pg.Pool(config)
