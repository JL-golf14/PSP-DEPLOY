// require('dotenv').config();
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var portDecision = process.env.PORT || 5000;

//Serving favicon
var favicon = require('serve-favicon')

//Routes
var admin = require('./routes/admin');
var adminTopics = require('./routes/admin-topics');
var login = require('./routes/login');
var data = require('./routes/data');
var engagement = require('./routes/engagement');

// var list_data = require('./routes/list_data');
var public = require('./routes/public');
var admin = require('./routes/admin');

//Serve Static Files
app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(favicon(path.join(__dirname, '../public/assets/favicon.ico')));

//anyone can see these routes.
app.use('/public', public);
//need to be a user to access these routes
app.use('/data', data);
//need to be a user to access these routes
app.use('/login', login);


/* Whatever you do below this is protected by your authentication. */
app.use(decoder.token);
//need to check to make sure the user is an admin before any of these routes can be acces.
app.use('/admin-topics', adminTopics);
//need to check to make sure the user is an admin before any of these routes can be accessed.
app.use('/admin', admin);
//need to be a user
app.use('/engagement', engagement);


app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});
