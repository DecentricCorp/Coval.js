"use strict"
let chai = require('chai')
let expect = chai.expect
var Coval = require('../build/Coval')
var Envelope = require('../build/transport/Envelope').Envelope
describe('Envelope', function () {

  it('assigns a value', function () {
    var envelope = new Envelope()
    envelope.AddValue('a')
    envelope.GetValue().should.equal("a")
  })

  it('err returns errors', function () {
    var envelope = new Envelope()
    envelope.AddError("some error")
    envelope.Errors()[0].message.should.equal("some error")
  })

  it('payload returns an entire envelope object', function () {
    var envelope = new Envelope()
    envelope.AddValue("a")
    envelope.AddError("some error")
    envelope.toString().should.deep.equal({
      value: "a",
      errors: [{ "message": "some error" }],
      logs: []
    })
  })

  it('correctly reports having errors', function () {
    var envelope = new Envelope()
    expect(envelope.HasErrors()).to.be.false
    envelope.AddError("an error")
    expect(envelope.HasErrors()).to.be.true
    expect(envelope.Errors()).to.have.lengthOf(1)
  })    
}) 
