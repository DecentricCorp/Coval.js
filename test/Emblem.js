"use strict"
var chai = require('chai')
var expect = chai.expect
var should = chai.should()
var UserLib = require('../build/base/User')
var Emblem = require('../build/Emblem').Emblem
var Dat = require('../build/transport/Dat').Dat

describe('Emblem', function () {

    var emblem
    var client_dat
    beforeEach(function () {
        emblem = new Emblem()
        client_dat = new Dat(UserLib.Client)
    })

    describe('Add Dat', function () {
        it('successfully adds dat to emblem', function () {
            var msg = emblem.AddDat(client_dat)
            expect(emblem.dats).to.have.lengthOf(1)
            expect(msg.GetValue()).to.equal('Sucessfully added dat')
        })
        it('only allows a single dat of any type to be added', function () {
            var dat2 = new Dat(UserLib.Client)
            var msg1 = emblem.AddDat(client_dat)
            var msg2 = emblem.AddDat(dat2)
            expect(emblem.dats).to.have.lengthOf(1)
            expect(msg1.GetValue()).to.equal('Sucessfully added dat')
            expect(msg2.Errors()[0].message).to.equal('Dat of this type already exists')
        })

        it('allows more than one dat to be added for different dat types')
    })
    describe('HasRequiredDats', function () {

        it('is false when no dats are present')
        it('is false when only client dat is present')
        it('is false when only server dat is present')
        it('is false when only client dat and identity dat are present')
        it('is false when only client dat and generic dat are present')
        it('is false when only server dat and identity dat are present')
        it('is false when only server dat and generic dat are present')

        // Split this test into the tests above
        it('is false when required dats are not fulfilled', function () {
            expect(emblem.dats).to.have.lengthOf(0)
            expect(emblem.HasRequiredDats()).to.false
            emblem.AddDat(client_dat)
            expect(emblem.HasRequiredDats()).to.false
        })
        
        it('is true when client and server dats are present') // suggested rewording to below test

        it('is true when required dats are fulfilled', function () {
            var server_dat = new Dat(UserLib.Server)
            var client_msg = emblem.AddDat(client_dat)
            var server_msg = emblem.AddDat(server_dat)
            expect(emblem.HasRequiredDats()).to.true
        })
    })
    describe('Claimed', () => {
        // Add code to claim an emblem, even if not yet developed. (can always tweak later to implementation)
        it('new emblem returns false until claimed', () => {
            expect(emblem.claimed).to.be.false
        })
    })
})
