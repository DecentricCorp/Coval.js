"use strict"
var UserLib = require('../build/base/User')
var UserType = UserLib.UserType
var Dat = require('../build/transport/Dat').Dat
var chai = require('chai')
var expect = chai.expect
var should = chai.should()

describe('User', function () {
    describe('of type Server', () => {
         
        it('generates a random seed', function () {
            var user = new UserLib.Server()
            var data = user.Generate()
            expect(data).to.exist
        })
        
        it('generates shares with no key provided', function () {
            var user = new UserLib.Server()
            var data = user.Split(2, 2, 256)
            expect(data).to.exist
        })
        
        it('reassembles shares into expected seed', function () {
            var user = new UserLib.Server()
            var key = user.Generate()
            var shares = user.Split(2, 2, 256)
            var combined = user.Combine(shares.value)
            expect(combined.value).to.equal(key.value)
        })
        
        it('provides a key', function(){
            var user = new UserLib.Server()
            var pk = '88ab17c73a58992ff6fe06aa5258095acb2f73ff872d73ae6f403eeb1248a007'
            user.SetKey(pk)
            expect(user.key.key).to.equal(pk)
        })
        
        it('splits a provided key', function(){
            var user = new UserLib.Server()
            var pk = '88ab17c73a58992ff6fe06aa5258095acb2f73ff872d73ae6f403eeb1248a007'
            user.SetKey(pk)
            var shares = user.Split(2, 2, 256)
            var combined = user.Combine(shares.value)
            expect(user.key.key).to.equal(pk)
            expect(combined.value).to.equal(pk)
        })
    })
    describe('of type Generic', ()=>{
        it('can not generate a random seed', function () {
            var user = new UserLib.User()
            expect(function () {
                user.Generate()
            }).to.throw('user.Generate is not a function')
        })
    })
})
