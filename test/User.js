"use strict"
var UserLib = require('../build/base/User')
var Dat = require('../build/transport/Dat').Dat
var chai = require('chai')
var expect = chai.expect
var should = chai.should()

describe('User', function(){
    describe('Dat', () => {
        it('Should identify as client when cast as client', function(){
            var dat = new Dat(UserLib.Client)
            expect(dat.user.constructor.name).to.equal("Client")
            expect(dat.user.type).to.equal("client")
        })

        it('Should identify as unloq when cast as identity', function(){
            var dat = new Dat(UserLib.Identity)
            expect(dat.user.constructor.name).to.equal("Identity")
            expect(dat.user.type).to.equal("identity")
        })

        it('Should identify as server when cast as server', function(){
            var dat = new Dat(UserLib.Server)
            expect(dat.user.constructor.name).to.equal("Server")
            expect(dat.user.type).to.equal("server")
        })

        it('Should identify as generic when not cast', function(){
            var dat = new Dat()
            expect(dat.user.constructor.name).to.equal("User")
            expect(dat.user.type).to.equal("generic")
        })
    })
})