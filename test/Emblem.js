"use strict"
var chai = require('chai')
var expect = chai.expect
var should = chai.should()
var UserLib = require('../build/base/User')
var Emblem = require('../build/Emblem').Emblem
var Dat = require('../build/transport/Dat').Dat

describe('Emblem', function () {

    var emblem
    const client_dat = new Dat(UserLib.Client)
    const server_dat = new Dat(UserLib.Server)
    const identity_dat = new Dat(UserLib.Identity)
    const generic_dat = new Dat()

    beforeEach(function () {
        emblem = new Emblem()
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

        it('allows more than one dat to be added for different dat types', function () {
            var client_msg = emblem.AddDat(client_dat)
            var server_msg = emblem.AddDat(server_dat)
            var identity_msg = emblem.AddDat(identity_dat)
            var generic_msg = emblem.AddDat(generic_dat)
            expect(client_msg.GetValue()).to.equal('Sucessfully added dat')
            expect(server_msg.GetValue()).to.equal('Sucessfully added dat')
            expect(identity_msg.GetValue()).to.equal('Sucessfully added dat')
            expect(generic_msg.GetValue()).to.equal('Sucessfully added dat')
        })
    })
    describe('HasRequiredDats', function () {

        it('is false when no dats are present', function () {
            expect(emblem.dats).to.be.empty
        })

        it('is false when only client dat is present', function () {
            emblem.AddDat(client_dat)
            expect(emblem.dats).to.have.lengthOf(1)
            expect(emblem.HasRequiredDats()).to.be.false
        })

        it('is false when only server dat is present', function () {
            emblem.AddDat(server_dat)
            expect(emblem.dats).to.have.lengthOf(1)
            expect(emblem.HasRequiredDats()).to.be.false
        })

        it('is false when only client dat and identity dat are present', function () {
            emblem.AddDat(client_dat)
            emblem.AddDat(identity_dat)
            expect(emblem.dats).to.have.lengthOf(2)
            expect(emblem.HasRequiredDats()).to.be.false
        })

        it('is false when only client dat and generic dat are present', function () {
            emblem.AddDat(client_dat)
            emblem.AddDat(generic_dat)
            expect(emblem.dats).to.have.lengthOf(2)
            expect(emblem.HasRequiredDats()).to.be.false
        })

        it('is false when only server dat and identity dat are present', function () {
            emblem.AddDat(server_dat)
            emblem.AddDat(identity_dat)
            expect(emblem.dats).to.have.lengthOf(2)
            expect(emblem.HasRequiredDats()).to.be.false
        })

        it('is false when only server dat and generic dat are present', function () {
            emblem.AddDat(server_dat)
            emblem.AddDat(generic_dat)
            expect(emblem.dats).to.have.lengthOf(2)
            expect(emblem.HasRequiredDats()).to.be.false
        })

        it('is true when client and server dats are present', function () {
            emblem.AddDat(client_dat)
            emblem.AddDat(server_dat)
            expect(emblem.dats).to.have.lengthOf(2)
            expect(emblem.HasRequiredDats()).to.be.true
        })
    })
    describe('Claimed', () => {
        // Add code to claim an emblem, even if not yet developed. (can always tweak later to implementation)
        it('new emblem returns false until claimed', () => {
            expect(emblem.claimed).to.be.false
        })
    })
})
