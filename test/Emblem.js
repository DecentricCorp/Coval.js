"use strict"
const expect = require('chai').expect
const UserLib = require('../build/base/User')
const Emblem = require('../build/Emblem').Emblem
const DatLib = require('../build/transport/Dat')
const DatManager = DatLib.DatManager
const DatNode = DatLib.DatNode

describe('Emblem', function () {

    var emblem
    var datmanager
    var client_dat
    var server_dat
    var identity_dat
    var generic_dat

    before(function() {
        datmanager = new DatManager()
        return Promise.all([
            datmanager.createDatNode("client", null, null),
            datmanager.createDatNode("server", null, null),
            datmanager.createDatNode("identity", null, null),
            datmanager.createDatNode("generic", null, null)
        ])
        .then(new Promise(function(resolve, reject) {
            client_dat = datmanager.getDatNode("client")
            server_dat = datmanager.getDatNode("server")
            identity_dat = datmanager.getDatNode("identity")
            generic_dat = datmanager.getDatNode("generic")
            resolve()
        }))
    })

    after(function() {
        datmanager.shutdown()
    })

    beforeEach(function () {
        emblem = new Emblem()
    })

    describe('Add Dat', function () {
        it('successfully adds dat to emblem', function () {
            const message = emblem.AddDatNode(client_dat)
            expect(emblem.datNodes).to.have.lengthOf(1)
            expect(message.GetValue()).to.equal('Sucessfully added dat')
        })
        it('only allows a single dat of any type to be added', function () {
            const dat2 = new DatNode("client", null, null)
            const message1 = emblem.AddDatNode(client_dat)
            const message2 = emblem.AddDatNode(dat2)
            expect(emblem.datNodes).to.have.lengthOf(1)
            expect(message1.GetValue()).to.equal('Sucessfully added dat')
            expect(message2.Errors()[0].message).to.equal('Dat of this type already exists')
        })

        it('allows one dat of each type to be added to an emblem', function () {
            const client_message = emblem.AddDatNode(client_dat)
            const server_message = emblem.AddDatNode(server_dat)
            const identity_message = emblem.AddDatNode(identity_dat)
            const generic_message = emblem.AddDatNode(generic_dat)
            expect(emblem.datNodes).to.have.lengthOf(4)
            expect(client_message.GetValue()).to.equal('Sucessfully added dat')
            expect(server_message.GetValue()).to.equal('Sucessfully added dat')
            expect(identity_message.GetValue()).to.equal('Sucessfully added dat')
            expect(generic_message.GetValue()).to.equal('Sucessfully added dat')
        })
    })

    describe('HasRequiredDats', function () {
        it('is false when no dats are present', function () {
            expect(emblem.datNodes).to.be.empty
        })

        it('is false when only client dat is present', function () {
            emblem.AddDatNode(client_dat)
            expect(emblem.datNodes).to.have.lengthOf(1)
            expect(emblem.HasRequiredDats()).to.be.false
        })

        it('is false when only server dat is present', function () {
            emblem.AddDatNode(server_dat)
            expect(emblem.datNodes).to.have.lengthOf(1)
            expect(emblem.HasRequiredDats()).to.be.false
        })

        it('is false when only client dat and identity dat are present', function () {
            emblem.AddDatNode(client_dat)
            emblem.AddDatNode(identity_dat)
            expect(emblem.datNodes).to.have.lengthOf(2)
            expect(emblem.HasRequiredDats()).to.be.false
        })

        it('is false when only client dat and generic dat are present', function () {
            emblem.AddDatNode(client_dat)
            emblem.AddDatNode(generic_dat)
            expect(emblem.datNodes).to.have.lengthOf(2)
            expect(emblem.HasRequiredDats()).to.be.false
        })

        it('is false when only server dat and identity dat are present', function () {
            emblem.AddDatNode(server_dat)
            emblem.AddDatNode(identity_dat)
            expect(emblem.datNodes).to.have.lengthOf(2)
            expect(emblem.HasRequiredDats()).to.be.false
        })

        it('is false when only server dat and generic dat are present', function () {
            emblem.AddDatNode(server_dat)
            emblem.AddDatNode(generic_dat)
            expect(emblem.datNodes).to.have.lengthOf(2)
            expect(emblem.HasRequiredDats()).to.be.false
        })

        it('is true when client and server dats are present', function () {
            emblem.AddDatNode(client_dat)
            emblem.AddDatNode(server_dat)
            expect(emblem.datNodes).to.have.lengthOf(2)
            expect(emblem.HasRequiredDats()).to.be.true
        })
    })

    describe('Claimed', () => {
        it('returns false by default for new emblem', () => {
            expect(emblem.claimed).to.be.false
        })

        // TODO: Pending completion of code to claim and track status of an emblem
        it('returns false until the emblem is claimed')
    })
})
