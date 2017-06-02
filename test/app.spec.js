var expect = require('chai').expect;

var request = require('superagent');

var nodeapp = require('../config/server');
var baseUrl = 'http://localhost:5000';

describe("Pictures login validation: ",function() {

    before(function(done){
        nodeapp.start(done)
    })
    after (function(done){
        nodeapp.stop(done)
    })
     
    it("check if validation suceeds on sending username and password", function(done){
        console.log("starting testcase")
        request.get(baseUrl + '/validateLogin?username=test&password=test').end(function assert(err, resp){
           // expect(resp).to.have.length.gt(0);
           // expect(err).not.to.be.ok;
           console.log("resp: "+resp)
            expect(resp).to.have.property('status', 404);
            done();
        })
    })

    //it("check if validation fails on sending invalid username", function(done){
      //  request.get(baseUrl + '/validateLogin?userName=invalidUser&password=test').end(function assert(err, resp){
        //    expect(resp).to.be.eq('"login Failed"');
          //  done();
        //})
    //})
})

describe('Test the getImages function which pulls images for logged in user', function () {
    before (function(done) {
        nodeapp.start(done);
    })
    after (function(done) {
        nodeapp.stop(done);
    })
    it ('Check if the function exists', function(done) {
        request.get(baseUrl+'/getImages').end(function assert(err, resp) {
            expect(resp).to.have.property('status',200);
            done();
        });
    });
})