var mdb = require('./config/db');
var nodeServer = require('./config/server');
var MongoClient = require('mongodb').MongoClient;

nodeServer.start();

var validateLogin = exports.validateLogin = function (db) {
    db.collection('picturesUsers').find({}).toArray(function(err, docs){
            console.log(docs[0])
        });
    return true;
}


MongoClient.connect(mdb.url, function(err, db){
    nodeServer.app.get('/validateLogin?:username', function(req, res){
        console.log(req.query.username)
     validateLogin(db);        
    });
    nodeServer.app.use(function(req, res){
        res.sendStatus(404); 
    });
});
