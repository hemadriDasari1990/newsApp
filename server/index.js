/**
* created by Hemadri Dasari on 02/05/2018
*/

//Initialize global variables here
global.rootdir = __dirname;
global.config = require("config");

// Importing Node modules and initializing Express
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require("method-override"),
  routes = require(__dirname + '/routes/News');

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(methodOverride('X-HTTP-Method-Override'));

// Enable CORS for client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

//Trigger manual GC every 3 hours 
let runGC = function(){
  if(global.gc){
    console.log("Garbage Collection is available");
    global.gc();
  }else{
    console.log("Garbage Collection unavailable");
  }
}

let intVar = setInterval(runGC, config.app.gcInterval);

let router = app.use('/news', routes);
app.listen(config.app.port, function(){
  console.log(`News service started on port ${config.app.port}`);
});

//Make JSON Pretty
app.set('json spaces', 2);

router.get('/', function(req, res){
  res.json({message: "News service is running"});
});

module.exports = app;