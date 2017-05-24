var mdb = require('./config/db');
var nodeServer = require('./config/server');
var MongoClient = require('mongodb').MongoClient;

nodeServer.start();

var validateLogin = exports.validateLogin = function (db,req, res) {
    db.collection('picturesUsers').find({"userName":req.query.username, "password": req.query.password}).toArray(function(err, docs){
          return docs;           
        });
}


MongoClient.connect(mdb.url, function(err, db){
    nodeServer.app.get('/validateLogin', function(req, res){
        var docs = validateLogin(db,req,res);
        console.log("initial log.........")
        if(docs[0]) {
            res.send(docs[0])
        } else {
            console.log("failing.........");
            res.send("login Failed")
        }             
    });
    nodeServer.app.use(function(req, res){
        res.sendStatus(404); 
    });
});
