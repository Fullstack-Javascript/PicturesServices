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


MongoClient.connect(mdb.url, function(err, db){
    nodeServer.app.get('/validateLogin', function(req, res){
        connectDropbox();
        //validateLogin(db,req,res);     
    });
    nodeServer.app.use(function(req, res){
        res.sendStatus(404); 
    });
});

var connectDropbox = exports.connectDropbox = function () {
    var dropbox = new Dropbox.DropboxClient('cfob4wge1sykhvh', 'rabair1lb8w7144');
   // var dropbox = new DropboxClient("cfob4wge1sykhvh", "rabair1lb8w7144", "Ogrp3bYPHeAAAAAAAAAAGEc77phgiZ415czsEpZF1dvafrRhDrpRgCwNWTCaGHL4", access_token_secret)
    console.log("dropbox: " + dropbox);

    /*dropbox.getAccountInfo(function (err, data) {
        if (err) console.log('Error: ' + err)
        else console.log(data.display_name + ', ' + data.email)
    })*/

    dropbox.getAccessToken('azadramasamy@gmail.com', 'Chandra@88', function (err, token, secret) {
    // Upload foo.txt to the Dropbox root directory.
    console.log("token: " + token);
    console.log("secret: " + secret);
    dropbox.putFile('foo.txt', 'foo.txt', function (err, data) {
        console.log("data: "+data)
        if (err) return console.error(err)

        // Move it into the Public directory.
        /*dropbox.move('foo.txt', 'Public/foo.txt', function (err, data) {
            if (err) return console.error(err)

            // Delete the file.
            dropbox.deleteItem('Public/foo.txt', function (err, data) {
                if (err) console.error(err.stack)
            })
        })*/
    })
    })
}
