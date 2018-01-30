"use strict"
var UserLib = require('../build/base/User')
var UserType = UserLib.UserType
var Agent = require('../build/Agent').Agent
var Unloq = require('../build/partner/Unloq').Unloq
var chai = require('chai')
var expect = chai.expect
var should = chai.should()

describe('Agent', () => {
    it('Should identify as client when cast as client', function(){
        var agent = new Agent(UserLib.Client)
        expect(agent.user.constructor.name).to.equal("Client")
        expect(agent.user.type).to.equal(UserType.Client)
    })

    it('Should identify as identity when cast as identity', function(){
        var agent = new Agent(UserLib.Identity)
        expect(agent.user.constructor.name).to.equal("Identity")
        expect(agent.user.type).to.equal(UserType.Identity)
    })

    it('Should identify of type Unloq as identity when cast as identity of Unloq', function(){
        var agent = new Agent(UserLib.Identity, Unloq, process.env.UNLOQ_KEY)
        expect(agent.user.constructor.name).to.equal("Identity")
        expect(agent.user.type).to.equal(UserType.Identity)
        expect(agent.user.identity.type).to.equal('Unloq')
        
    })

    it('Should identify as server when cast as server', function(){
        var agent = new Agent(UserLib.Server)
        expect(agent.user.constructor.name).to.equal("Server")
        expect(agent.user.type).to.equal(UserType.Server)
    })
  
    it('Should identify as generic when not cast', function(){
        var agent = new Agent()
        
        expect(agent.user.constructor.name).to.equal("User")
        expect(agent.user.type).to.equal(UserType.Generic)
    })

    it('Should allow server to generate random', function(){
        var agent = new Agent(UserLib.Server)
        var data = agent.user.Generate()
        expect(data).to.exist
    })

    it('Should allow server to split random', function(){
        var agent = new Agent(UserLib.Server)
        var data = agent.user.Split(2, 2, 256)
        expect(data).to.exist
    })

    it('Should allow server to split random and reassemble', function(){
        var agent = new Agent(UserLib.Server)
        var key = agent.Generate()
        var shares = agent.Split(2, 2, 256)
        var combined = agent.Combine(shares.value)
        expect(combined.value).to.equal(key.value)        
    })

    it('Should not allow generic agent to generate random', function(){
        var agent = new Agent()
        expect(function(){
            agent.Generate()
        }).to.throw('Method not implemented.')
    })
})
