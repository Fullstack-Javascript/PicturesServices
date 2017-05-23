var expect = require('chai').expect;

describe("Pictures login validation",function(){
    var nodeapp = require('../app');
    it("check if validation suceeds on sending username and password", function(){
        var validate=nodeapp.validateLogin("test","test")
        expect(validate).to.be.true;
    })
})