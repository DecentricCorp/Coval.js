"use strict"
var UserLib = require('../build/base/User')
var Agent = require('../build/Agent').Agent
var Unloq = require('../build/partner/Unloq').Unloq
var chai = require('chai')
var expect = chai.expect
var should = chai.should()

describe('Agent', () => {
    it('Should identify as client when cast as client', function(){
        var agent = new Agent(UserLib.Client)
        expect(agent.user.constructor.name).to.equal("Client")
        expect(agent.user.type).to.equal("client")
    })

    it('Should identify as identity when cast as identity', function(){
        var agent = new Agent(UserLib.Identity)
        expect(agent.user.constructor.name).to.equal("Identity")
        expect(agent.user.type).to.equal("identity")
        console.log('------------ identity type', agent.user)
    })

    it('Should identify of type Unloq as identity when cast as identity of Unloq', function(){
        var agent = new Agent(UserLib.Identity, Unloq, process.env.UNLOQ_KEY)
        expect(agent.user.constructor.name).to.equal("Identity")
        expect(agent.user.type).to.equal("identity")
        expect(agent.user.identity.type).to.equal('Unloq')
        
    })

    it('Should identify as server when cast as server', function(){
        var agent = new Agent(UserLib.Server)
        expect(agent.user.constructor.name).to.equal("Server")
        expect(agent.user.type).to.equal("server")
    })
  
    it('Should identify as generic when not cast', function(){
        var agent = new Agent()
        expect(agent.user.constructor.name).to.equal("User")
        expect(agent.user.type).to.equal("generic")
    })
})
