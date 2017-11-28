"use strict"
require('chai')
var collector = require('../src/envelope')

describe('Envelope', function() {

    it('toString should return stringified value', function(){
      var envelope = new collector.Envelope("a")
      envelope.toString().should.equal("a")
    })

    it('err should return errors', function(){
      var envelope = new collector.Envelope("a", "some error")
      envelope.err.should.deep.equal(["some error"])
    })

    it('msg should return msgs', function(){
      var envelope = new collector.Envelope("a", "some error", "some msg")
      envelope.msg.should.deep.equal(["some msg"])
    })

    it('payload should return entire envelope object', function(){
      var envelope = new collector.Envelope("a", "some error", "some msg")
      envelope.payload.should.deep.equal({
        value: "a",
        err: ["some error"],
        msg: ["some msg"]
      })
    })

    it('should allow me to update msg after init', function(){
        var envelope = new collector.Envelope("a", "some error", "some msg")
        envelope.msg.should.deep.equal(["some msg"])
        envelope.msg = ["another msg"]
        envelope.msg.should.deep.equal(["another msg"])
    })

  })