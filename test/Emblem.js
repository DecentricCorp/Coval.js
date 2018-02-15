"use strict"
const expect = require('chai').expect
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
            const message = emblem.AddDat(client_dat)
            expect(emblem.dats).to.have.lengthOf(1)
            expect(message.GetValue()).to.equal('Sucessfully added dat')
        })
        it('only allows a single dat of any type to be added', function () {
            const dat2 = new Dat(UserLib.Client)
            const message1 = emblem.AddDat(client_dat)
            const message2 = emblem.AddDat(dat2)
            expect(emblem.dats).to.have.lengthOf(1)
            expect(message1.GetValue()).to.equal('Sucessfully added dat')
            expect(message2.Errors()[0].message).to.equal('Dat of this type already exists')
        })

        it('allows one dat of each type to be added to an emblem', function () {
            const client_message = emblem.AddDat(client_dat)
            const server_message = emblem.AddDat(server_dat)
            const identity_message = emblem.AddDat(identity_dat)
            const generic_message = emblem.AddDat(generic_dat)
            expect(client_message.GetValue()).to.equal('Sucessfully added dat')
            expect(server_message.GetValue()).to.equal('Sucessfully added dat')
            expect(identity_message.GetValue()).to.equal('Sucessfully added dat')
            expect(generic_message.GetValue()).to.equal('Sucessfully added dat')
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
