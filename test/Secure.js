"use strict"
var chai = require('chai')
var expect = chai.expect
var should = chai.should()
var Coval = require('../build/Coval')
var CovalSecure = new Coval.Secure()
var Shamir = CovalSecure.Shamir
var Protected = CovalSecure.Protected

describe('Protected', function () {

  it('should not be able to access internal value', function () {
    var _protected = new Protected()
    expect(_protected.myPrivateVar).to.not.exist
  })

  it('should return expected value', function () {
    var _protected = new Protected(3)
    expect(_protected.Value().GetValue()).to.equal(3)
  })

  it('should not allow value to be accessed twice', function () {
    var _protected = new Protected("this msg will self destruct")
    expect(_protected.Value().GetValue()).to.equal("this msg will self destruct")
    expect(_protected.Value().GetValue()).to.equal(null)
  })

  it('should record error when read attempted twice', function () {
    var _protected = new Protected("this msg will self destruct")
    var readOnce = _protected.Value().GetValue()
    var readAgain = _protected.Value()
    expect(readOnce).to.equal("this msg will self destruct")
    expect(readAgain.HasErrors()).to.be.true
    expect(readAgain.Errors()[0].message).to.equal("Self destructed!")
  })

})

describe('Shamir', function () {

  describe('GetKey', function () {
    it('should not be null', function () {
      var key1 = new Shamir.Key().GetKey()
      should.exist(key1)
    })

    it('should return unique keys when called on unique objects', function () {
      let key1 = new Shamir.Key().GetKey()
      let key2 = new Shamir.Key().GetKey()
      key1.should.not.equal(key2)
    })

    it('should log error when accessing key twice', function () {
      var serverObject = new Shamir.Key()
      var key1 = serverObject.GetKey()
      expect(key1.Errors()).to.be.empty.and.an('Array')
      var key2 = serverObject.GetKey()
      expect(key2.Errors()).to.be.an('Array')
      expect(key2.Errors()[0].message).to.equal("Key accessed twice!")
    })

  })
  describe('CreateShares', function () {
    it('should split key into 2 shares', function () {
      var serverObject = new Shamir.Key()
      var shares = serverObject.CreateShares().GetValue()
      expect(shares).to.not.be.empty
      var key = serverObject.GetKey()
      //expect(key.GetValue()).to.be.null
      expect(key.Errors()[0].message).to.equal("Key accessed twice!")
    })
  })
  describe('CombineShares', function () {
    it('should combine shares', function(){
      var serverObject = new Shamir.Key()
      var shares = serverObject.CreateShares().GetValue()
      var combined = serverObject.CombineShares(shares)
    })    
  })
})