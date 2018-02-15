"use strict"
const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const UserLib = require('../build/base/User')
const Emblem = require('../build/Emblem').Emblem
const Dat = require('../build/transport/Dat').Dat

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
            const msg = emblem.AddDat(client_dat)
            expect(emblem.dats).to.have.lengthOf(1)
            expect(msg.GetValue()).to.equal('Sucessfully added dat')
        })
        it('only allows a single dat of any type to be added', function () {
            const dat2 = new Dat(UserLib.Client)
            const msg1 = emblem.AddDat(client_dat)
            const msg2 = emblem.AddDat(dat2)
            expect(emblem.dats).to.have.lengthOf(1)
            expect(msg1.GetValue()).to.equal('Sucessfully added dat')
            expect(msg2.Errors()[0].message).to.equal('Dat of this type already exists')
        })

        it('allows more than one dat to be added for different dat types', function () {
            const client_msg = emblem.AddDat(client_dat)
            const server_msg = emblem.AddDat(server_dat)
            const identity_msg = emblem.AddDat(identity_dat)
            const generic_msg = emblem.AddDat(generic_dat)
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
