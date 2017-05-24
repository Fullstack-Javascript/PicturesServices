var expect = require('chai').expect;
var nodeapp = require('../config/server');
var request = require('superagent');

var baseUrl = 'http://localhost:5000'; 

describe("Pictures login validation",function() {
    before(function(done){
        nodeapp.start(done)
    })
    after (function(done){
        nodeapp.stop(done)
    })
    it("check if validation suceeds on sending username and password", function(){
        request.get(baseUrl + '/validateLogin?userName=test&password=test').end(function assert(err, resp){
            expect(resp).to.have.length.gt(0);
            done();
        })
    })

    it("check if validation fails on sending invalid username", function(){
        request.get(baseUrl + '/validateLogin?userName=invalidUser&password=test').end(function assert(err, resp){
            expect(resp).to.be.eq("login Faile");
            done();
        })
    })
})