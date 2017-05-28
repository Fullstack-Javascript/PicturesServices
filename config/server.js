var express = require('express');
var app = exports.app = express();

var server;

var start = exports.start = function start(callback){
    server = app.listen(process.env.PORT || 5000, callback);
    console.log("server started and listening")
}

var stop = exports.stop = function stop(callback){
    server.close(callback);
}
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      //  res.header("Pragma", "no-cache");
      //  res.header("Expires", 0);
    // Pass to next layer of middleware
    next();
});