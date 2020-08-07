"use strict"
var chai = require('chai')
var expect = chai.expect
var should = chai.should()
var LightrailLib = require("../build/partner/Lightrail").Lightrail
var path = require("path")
require("dotenv").config({ path: path.join(__dirname, "..", "build", "test.env") })

describe('Lightrail', () => {
    it('instantiates successfully with default configuration', () => {
        var Lightrail = new LightrailLib().client
        expect(Lightrail).to.exist
        expect(Lightrail.configuration).to.deep.equal({
            apiKey: null,
            restRoot: 'https://api.lightrail.com/v1/',
            sharedSecret: null,
            logRequests: false,
            additionalHeaders: {}
        })
    })

    it('instantiates with one option passed', () => {
        var Lightrail = new LightrailLib({ apiKey: "123" }).client
        expect(Lightrail.configuration).to.deep.equal({
            apiKey: "123",
            restRoot: 'https://api.lightrail.com/v1/',
            sharedSecret: null,
            logRequests: false,
            additionalHeaders: {}
        })
    })

    it('instantiates with all options passed', () => {
        var Lightrail = new LightrailLib({
            apiKey: "123",
            restRoot: 'https://api.lightrail.com/v1/',
            sharedSecret: "456",
            logRequests: true,
            additionalHeaders: {}
        }
        ).client
        expect(Lightrail.configuration).to.deep.equal({
            apiKey: "123",
            restRoot: 'https://api.lightrail.com/v1/',
            sharedSecret: "456",
            logRequests: true,
            additionalHeaders: {}
        })
    })

    it('allows creation of a new contact', () => {
        var Lightrail = new LightrailLib()
        var params = Lightrail.ContactParams("test", "user", "e@mail.com")
        expect(params).to.deep.equal({
            userSuppliedId: 'testID',
            email: 'e@mail.com',
            firstName: 'test',
            lastName: 'user'
        })
    })

    it('loads with an apiKey from an environment variable', () => {
        var Lightrail = new LightrailLib({ apiKey: process.env.LIGHTRAIL_API_KEY }).client
        expect(Lightrail.configuration.apiKey).to.exist
    })

    describe('Create Contact', () => {
        it('creates a new user', function (done) {
            this.timeout(6000)
            var Lightrail = new LightrailLib({ apiKey: process.env.LIGHTRAIL_API_KEY })
            var user = Lightrail.CreateContact(Lightrail.ContactParams("test", "user", "e@mail.com"))
            user.then((response) => {
                expect(response.contactId).to.exist
                done()
            })
        })

        it('handles a lost connection gracefully')
    })
})
