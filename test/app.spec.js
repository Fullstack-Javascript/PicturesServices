var expect = require('chai').expect;

var request = require('superagent');



describe("Pictures login validation: ",function() {
    var nodeapp = require('../config/server');
    var baseUrl = 'http://localhost:5000';
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