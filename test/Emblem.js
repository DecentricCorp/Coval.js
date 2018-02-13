"use strict"
var chai = require('chai')
var expect = chai.expect
var should = chai.should()
var UserLib = require('../build/base/User')
var Emblem = require('../build/Emblem').Emblem
var Dat = require('../build/transport/Dat').Dat

describe('Emblem', function () {
    describe('Add Dat', function () {
        it('successfully adds dat to emblem', function () {
            var emblem = new Emblem()
            var dat = new Dat(UserLib.Client)
            var msg = emblem.AddDat(dat)
            expect(emblem.dats).to.have.lengthOf(1)
            expect(msg.GetValue()).to.equal('Sucessfully added dat')
        })
        it('only allows a single dat of any type to be added', function () {
            var emblem = new Emblem()
            var dat1 = new Dat(UserLib.Client)
            var dat2 = new Dat(UserLib.Client)
            var msg1 = emblem.AddDat(dat1)
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
            var emblem = new Emblem()
            var dat = new Dat(UserLib.Client)
            expect(emblem.dats).to.have.lengthOf(0)
            expect(emblem.HasRequiredDats()).to.false
            emblem.AddDat(dat)
            expect(emblem.HasRequiredDats()).to.false
        })
        
        it('is true when client and server dats are present') // suggested rewording to below test

        it('is true when required dats are fulfilled', function () {
            var emblem = new Emblem()
            var dat1 = new Dat(UserLib.Client)
            var dat2 = new Dat(UserLib.Server)
            var msg1 = emblem.AddDat(dat1)
            var msg2 = emblem.AddDat(dat2)
            expect(emblem.HasRequiredDats()).to.true
        })
    })
    describe('Claimed', () => {
        // Add code to claim an emblem, even if not yet developed. (can always tweak later to implementation)
        it('new emblem returns false until claimed', () => {
            var emblem = new Emblem()
            expect(emblem.claimed).to.be.false
        })
    })
})
