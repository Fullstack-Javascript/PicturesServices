var mdb = require('./config/db');
var nodeServer = require('./config/server');
var MongoClient = require('mongodb').MongoClient;
var Dropbox = require('dropbox-node');

nodeServer.start();

var validateLogin = exports.validateLogin = function (db,req, res) {
    db.collection('picturesUsers').find({"userName":req.query.username, "password": req.query.password}).toArray(function(err, docs){
        if(docs[0]) {
            res.json(docs[0])
        } else {
            res.status(403);
           res.json({error:"login Failed"})
             
        }               
        });
}

var getImages = exports.getImages = function(db, req, res) {
    db.collection('gallery').find({"userName":req.query.userName}).toArray(function(err, docs){
        res.json(docs[0]);
    })
};


MongoClient.connect(mdb.url, function(err, db){
    nodeServer.app.get('/validateLogin', function(req, res){
        validateLogin(db,req,res);     
    });
    nodeServer.app.get('/getImages', function(req, res){
        getImages(db,req,res);     
    });
    nodeServer.app.use(function(req, res){
        res.sendStatus(404); 
    });
});