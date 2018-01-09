"use strict"
let chai = require('chai')
let expect = chai.expect
var Coval = require('../build/Coval')
var CovalTransport = new Coval.Transport()
var Envelope = CovalTransport.Envelope
describe('Envelope', function() {
    
        it('should be able to assign value', function(){
          var envelope = new Envelope()
          envelope.AddValue('a')
          envelope.GetValue().should.equal("a")
        })
    
        it('err should return errors', function(){
          var envelope = new Envelope()
          envelope.AddError("some error")
          envelope.Errors()[0].message.should.equal("some error")
        })
    
        it('payload should return entire envelope object', function(){
          var envelope = new Envelope()
          envelope.AddValue("a")
          envelope.AddError("some error")
          envelope.toString().should.deep.equal({
            value: "a",
            errors: [ {"message": "some error"}],
            logs: []
          })
        })

        it('should correctly report having errors', function(){
          var envelope = new Envelope()
          expect(envelope.HasErrors()).to.be.false
          envelope.AddError("an error")
          expect(envelope.HasErrors()).to.be.true
          expect(envelope.Errors()).to.have.lengthOf(1)
        })    
      }) 