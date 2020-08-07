"use strict"
var UserLib = require('../build/base/User')
var UserType = UserLib.UserType
var Agent = require('../build/Agent').Agent
var Unloq = require('../build/partner/Unloq').Unloq
var expect = require('chai').expect

describe('Agent', () => {

    it('identifies as a client when cast as client', function () {
        const agent = new Agent(UserLib.Client)
        expect(agent.user.constructor.name).to.equal("Client")
        expect(agent.user.type).to.equal(UserType.Client)
    })

    it('identifies as an identity when cast as identity', function () {
        const agent = new Agent(UserLib.Identity)
        expect(agent.user.constructor.name).to.equal("Identity")
        expect(agent.user.type).to.equal(UserType.Identity)
    })

    it('identifies as an Unloq identity when cast as an Unloq identity', function () {
        const agent = new Agent(UserLib.Identity, Unloq, process.env.UNLOQ_KEY)
        expect(agent.user.constructor.name).to.equal("Identity")
        expect(agent.user.type).to.equal(UserType.Identity)
        expect(agent.user.identity.type).to.equal('Unloq')
    })

    it('identifies as a server when cast as server', function () {
        const agent = new Agent(UserLib.Server)
        expect(agent.user.constructor.name).to.equal("Server")
        expect(agent.user.type).to.equal(UserType.Server)
    })

    it('identifies as generic when not cast', function () {
        const agent = new Agent()
        expect(agent.user.constructor.name).to.equal("User")
        expect(agent.user.type).to.equal(UserType.Generic)
    })
})
