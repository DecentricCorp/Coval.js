"use strict"
var chai = require('chai')
var expect = chai.expect
var should = chai.should()
var lib = require('../src/server')

describe('Server', function() {

  describe('getKey', function() {    
    it('should not be null', function() {
      var key1 = new lib.Server().getKey()
      should.exist(key1)
    })

    it('should return unique keys when called on unique objects', function(){
      var key1 = new lib.Server().getKey()
      var key2 = new lib.Server().getKey()
      key1.should.not.equal(key2)
    })

    it('should return same key when called on same object', function(){
      var serverObject = new lib.Server()
      var key1 = serverObject.getKey()
      var key2 = serverObject.getKey()
      key1.toString().should.equal(key2.toString())
    })

    it('should log error when accessing key twice', function(){
      var serverObject = new lib.Server()
      var key1 = serverObject.getKey()
      expect(key1.payload.err).to.be.an('Array').that.is.empty
      var key2 = serverObject.getKey()
      expect(key2.payload.err).to.be.an('Array').that.is.not.empty
    })
  })

})


