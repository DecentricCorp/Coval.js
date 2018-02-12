"use strict"
const Envelope = require('../build/transport/Envelope').Envelope
const UserLib = require('../build/base/User')
const UserType = UserLib.UserType
const Dat = require('../build/transport/Dat').Dat
const chai = require('chai')
const expect = chai.expect
const should = chai.should()

describe('User', function () {
    describe('of type Server', () => {

        const private_key = '88ab17c73a58992ff6fe06aa5258095acb2f73ff872d73ae6f403eeb1248a007'
        var server
        beforeEach(function () {
            server = new UserLib.Server()
        })

        it('generates a random seed', function () {
            const data = server.Generate()
            expect(data).to.be.an.instanceOf(Envelope)
            expect(data).to.exist
        })

        it('generates shares with no key provided', function () {
            const data = server.Split(2, 2, 256)
            expect(data).to.be.an.instanceOf(Envelope)
            expect(data).to.exist
        })

        it('generates shares with key provided', function() {
            server.SetKey(private_key)
            const data = server.Split(2, 2, 256)
            expect(data).to.be.an.instanceOf(Envelope)
            expect(data).to.exist
        })

        it('reassembles shares into expected seed', function () {
            const shares = ['801e4ea44ba397a97d964ac51a5fc99fd0e697e240f8f7404ae415bcdc7cdb0e75998e7e075f611303ea4d3bef0a016fe1b',
                            '802d5c9886972f433afc845a257e52fe71f571c714a4d00be3085a98d707195c85c6da248f66555f593e47b23dd6bf41c3f']
            server.SetKey(private_key)
            const combined = server.Combine(shares)
            expect(combined.value).to.equal(private_key)
        })

        it('prevents passing a non-number to generate', function () {
            expect(function () {
                server.Generate('not a number')
            }).to.throw(Error, 'Number of bits must be an Integer between 1 and 65536')
        })

        it('provides a key', function () {
            server.SetKey(private_key)
            expect(server.GetKey()).to.equal(private_key)
        })

        it('splits a provided key', function () {
            server.SetKey(private_key)
            const shares = server.Split(2, 2, 256)
            const combined = server.Combine(shares.value)
            expect(server.GetKey()).to.equal(private_key)
            expect(combined.value).to.equal(private_key)
        })

        it('generates only one new key per server instantiation', function () {
            const first_key = server.Generate()
            const second_key = server.Generate()
            expect(first_key.value).to.equal(second_key.value)
        })

        it('generates different keys with different servers', function () {
            const first_key = server.Generate()
            const second_server = new UserLib.Server
            const second_key = second_server.Generate()
            expect(first_key.value).to.not.equal(second_key.value)
        })

        it('is able to split multiple times and recombine', function () {
            const key = server.Generate().value
            const first_split = server.Split(2, 2, 256)
            const second_split = server.Split(2, 2, 256)

            const combined = server.Combine(first_split.value.concat(second_split.value)) 

            expect(combined.value).to.equal(key)
        })
    })

    describe('of type Generic', () => {
        it('can not generate a random seed', function () {
            const user = new UserLib.User()
            expect(function () {
                user.Generate()
            }).to.throw('user.Generate is not a function')
        })
    })
})
