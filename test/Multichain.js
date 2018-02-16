"use strict"
let chai = require('chai')
let expect = chai.expect
var Multichain = require("../build/transport/Multichain").Multichain
var MultichainConnection = require("../build/transport/Multichain").MultichainConnection
var path = require("path")
const mock = require('./multichain-data/multichainMock.json')
require("dotenv").config({ path: path.join(__dirname, "..", "build", "test.env") })

describe('Multichain', () => {
    it('connects to a valid multichain instance', () => {
        var multichain = makeConnectedMultichainObject()
        multichain.Info(function (err, info) {
            expect(err).to.not.exist
            expect(info).to.exist
            expect(info.version).to.equal(mock.info.version)
        })
    })

    it('allows instantiation without a connection object', () => {
        var multichain = new Multichain()
        expect(multichain).to.exist
    })

    it('allows for loading a connection after construction of an object', () => {
        var multichain = new Multichain()
        multichain.Connect(makeConnectionFromEnv())
    })

    describe('Streams', () => {
        it('returns a list of streams', function (done) {
            var multichain = makeConnectedMultichainObject()
            multichain.Streams(function (err, streams) {
                expect(err).to.not.exist
                expect(streams).to.exist
                expect(streams[0].name).to.equal("root")
                done()
            })
        })
        describe('StreamItemsByKey', () => {
            it('returns a stream of items by key', function (done) {
                var multichain = makeConnectedMultichainObject()
                multichain.StreamItemsByKey(mock.streams[1].name, mock.streamitem.key, function (err, items) {
                    expect(err).to.not.exist
                    expect(items).to.exist
                    expect(items[0].value).to.equal(mock.streamitem.value)
                    done()
                })
            })

            it('returns an empty list with no error when key not found', function (done) {
                var multichain = makeConnectedMultichainObject()
                multichain.StreamItemsByKey(mock.streams[1].name, "InvalidKey", function (err, items) {
                    expect(err).to.not.exist
                    expect(items).to.be.empty
                    done()
                })
            })

            it('returns an error when stream not found', function (done) {
                var multichain = makeConnectedMultichainObject()
                multichain.StreamItemsByKey("InvalidStream", "InvalidKey", function (err, items) {
                    expect(err).to.exist
                    expect(err.message).to.equal('Stream with this name not found: InvalidStream')
                    done()
                })
            })
        })

        describe('StreamItemsByPublisher', () => {
            it('returns a stream of items by publisher')
            it('returns an error when stream not found')
        })

    })

    describe('Address', () => {
        it('imports an address', function (done) {
            var multichain = makeConnectedMultichainObject()
            multichain.ImportAddress(mock.import.from.address, "TestFromAddress", function (err, result) {
                expect(err).to.not.exist
                multichain.ImportAddress(mock.import.to.address, "TestToAddress", function (err, result) {
                    expect(err).to.not.exist
                    done()
                })
            })
        })
        it('allows granting of permissions', () => {
            var multichain = makeConnectedMultichainObject()
            multichain.GrantPermissionToAddress(mock.import.from.address, "send,receive", function (err, result) {
                expect(err).to.not.exist
                expect(result).to.exist
            })
        })
        it('allows revoking of permissions', () => {
            var multichain = makeConnectedMultichainObject()
            multichain.RevokePermissionToAddress(mock.import.from.address, "send,receive", function (err, result) {
                expect(err).to.not.exist
                expect(result).to.exist
            })
        })
        it('allows creation of raw signed tx', function (done) {
            var multichain = makeConnectedMultichainObject()
            multichain.GrantPermissionToAddress(mock.import.from.address, "send,receive", function (err, result) {
                multichain.CreateAndSignSend(mock.import.from.key, mock.import.to.address, "virtual", 1, function (err, raw) {
                    expect(raw.complete).to.be.true
                    done()
                })
            })
        })
        it('allows sending of raw signed tx', function (done) {
            var multichain = makeConnectedMultichainObject()
            multichain.GrantPermissionToAddress(mock.import.to.address, "send,receive", function(err, result){
                multichain.GrantPermissionToAddress(mock.import.from.address, "send,receive", function(err, result){
                    multichain.CreateAndSignSend(mock.import.from.key, mock.import.to.address,"virtual", 1, function(err, signed){
                        multichain.SendSignedTransaction(signed.hex.toString("hex"), function(err, txid){
                            expect(txid).to.exist
                            done()
                        })
                    })
                })
            })
        })
    })

    describe('Asset', () => {
        var rnd, asset, emblem
        before(function() {
            rnd = Math.floor(Math.random() * (1000000 - 1) + 1)
            asset = "testasset"+rnd.toString()
            emblem = "emblem-"+rnd.toString()
            console.log('-=-=-=-- asset name', asset)
        })
        it('issues asset to internal user', ()=> {
            var multichain = makeConnectedMultichainObject()
            multichain.Issue(mock.multichain.address, asset, 2, function(err, tx){
                expect(err).to.not.exist
            })
        })
        it('issues more of an asset to external user', ()=> {
            var multichain = makeConnectedMultichainObject()
            multichain.IssueMore(mock.import.from.address, asset, 1, function(err, tx){
                expect(err).to.not.exist
            })
        })
        it('sends asset from internal user to burn address', ()=> {
            var multichain = makeConnectedMultichainObject()
            multichain.SendAssetFrom(mock.multichain.address, mock.info.burnaddress, 1, asset, function(err, tx){
                console.log('--------- send internal err', err)
                expect(err).to.not.exist
            })
        })
        it('sends asset from an externally signed tx to burn address', function(done) {
            var multichain = makeConnectedMultichainObject()
            multichain.CreateAndSignSend(mock.import.from.key, mock.info.burnaddress, asset, 1, function(err, signed){
                multichain.SendSignedTransaction(signed.hex.toString("hex"), function(err, txid){
                    expect(txid).to.exist
                    done()
                })
            })
        })
        it.skip('creates an exchange tx', function(done) {
            //https://www.multichain.com/qa/5660/issue-locking-unspent-output
            this.timeout(100000)
            var multichain = makeConnectedMultichainObject()
            multichain.CreateExchange(mock.multichain.address, asset, "virtual", function(err, raw){
                console.log('-------- create err', err)
                expect(err).to.not.exist
                console.log('-------- create raw', raw)
                multichain.FinalizeExchange(raw.prepared, raw.unlocks.txid, raw.unlocks.vout, raw.asking, function(err, complete){
                    console.log('---------Final err', err)
                    console.log('-------- Complete', complete)
                })
                
            })
        })
        it('issues emblem to specified address', function(done) {
            var multichain = makeConnectedMultichainObject()
            multichain.IssueEmblem(mock.import.to.address, emblem, function(err, txid){
                //console.log('----------- Issue Emblem', err, txid)
                expect(err).to.not.exist
                expect(txid).to.exist
                done()
            })
        })
    })
})

function makeConnectionFromEnv() {
    return new MultichainConnection(
        Number(process.env.MULTICHAINport),
        process.env.MULTICHAINhost,
        process.env.MULTICHAINuser,
        process.env.MULTICHAINpass
    )
}

function makeConnectedMultichainObject() {
    return new Multichain(process.env.MULTICHAINADDRESS, makeConnectionFromEnv())
}
