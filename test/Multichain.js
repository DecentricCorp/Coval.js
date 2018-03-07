"use strict"
let chai = require('chai')
let expect = chai.expect
var Multichain = require("../build/transport/Multichain").Multichain
var MultichainConnection = require("../build/transport/Multichain").MultichainConnection
var path = require("path")
const mock = require('./multichain-data/multichainMock.json')
require("dotenv").config({ path: path.join(__dirname, "..", "build", "test.env") })

describe('Multichain', () => {
    var multichain
    beforeEach(function () {
        multichain = Multichain.makeConnectedMultichainObject()
    })

    it('connects to a valid multichain instance', (done) => {
        multichain.Info(function (error, info) {
            expect(error).to.not.exist
            expect(info).to.exist
            expect(info.version).to.equal(mock.info.version)
            done()
        })
    })

    it('allows instantiation without a connection object', (done) => {
        var empty_multichain = new Multichain()
        expect(empty_multichain).to.exist
        empty_multichain.Info(function (error, info) {
            expect(info).to.not.exist
            expect(error.name).to.equal('MultichainError')
            expect(error.message).to.equal('An unexpected error occurred in multichain, are you connected?')
            expect(error.cause.name).to.equal('TypeError')
            expect(error.cause.message).to.equal('this.multichain.getInfo is not a function')
            done()
        })
    })

    it('allows for loading a connection after construction of an object', (done) => {
        var empty_multichain = new Multichain()
        empty_multichain.Connect(Multichain.makeConnectionFromEnv())
        empty_multichain.Info((error, info) => {
            expect(error).to.not.exist
            expect(info).to.exist
            done()
        })
    })

    describe('Streams', () => {
        const mockStreamName = "TestStream"
        const mockStreamValue = "TestValue"

        it('throws not connected error when no valid connection is present', function(done) {
            var empty_multichain = new Multichain()
            empty_multichain.Streams(function (error, info) {
                expect(info).to.not.exist
                expect(error.name).to.equal('MultichainError')
                expect(error.message).to.equal('An unexpected error occurred in multichain, are you connected?')
                expect(error.cause.name).to.equal('TypeError')
                expect(error.cause.message).to.equal('this.multichain.listStreams is not a function')
                done()
            })
        })

        it('returns a list of streams', function (done) {
            multichain.Streams(function (error, streams) {
                expect(error).to.not.exist
                expect(streams).to.exist
                expect(streams.length).to.equal(3)
                expect(streams[0].name).to.equal("root")
                expect(streams[1].name).to.equal("TestStream")
                expect(streams[2].name).to.equal("emblems")
                done()
            })
        })

        describe('StreamItemsByKey', () => {
            const mockStreamKey = "TestItem"

            it('callback includes error and does not call stream items if error generated during listStreamKeyItems', function(done) {
                var realFunction = multichain.multichain.listStreamKeyItems
                multichain.multichain.listStreamKeyItems = function(config, callback) {
                    throw new Error("I'm jacked yo!")
                    //This is SOOO ugly; but will be fixed w/ promisification
                    realFunction(config, callback)
                }
                multichain.StreamItemsByKey(mockStreamName, mockStreamKey, function (error, info) {
                    expect(info).to.not.exist
                    expect(error.name).to.equal('MultichainError')
                    expect(error.message).to.equal('An unexpected error occurred in multichain, are you connected?')
                    expect(error.cause.name).to.equal('Error')
                    expect(error.cause.message).to.equal("I'm jacked yo!")
                    done()
                })
            })

            
            it('throws not connected error when no valid connection is present', function(done) {
                var empty_multichain = new Multichain()
                empty_multichain.StreamItemsByKey(mockStreamName, mockStreamKey, function (error, info) {
                    expect(info).to.not.exist
                    expect(error.name).to.equal('MultichainError')
                    expect(error.message).to.equal('An unexpected error occurred in multichain, are you connected?')
                    expect(error.cause.name).to.equal('TypeError')
                    expect(error.cause.message).to.equal('this.multichain.listStreamKeyItems is not a function')
                    done()
                })
            })
            
            it('returns a stream of items by key', function (done) {
                multichain.StreamItemsByKey(mockStreamName, mockStreamKey, function (error, items) {
                    expect(error).to.not.exist
                    expect(items).to.exist
                    expect(items[0].value).to.equal(mockStreamValue)
                    done()
                })
            })
            
            it('returns an empty list with no error when key not found', function (done) {
                multichain.StreamItemsByKey(mockStreamName, "InvalidKey", function (error, items) {
                    expect(error).to.not.exist
                    expect(items).to.be.empty
                    done()
                })
            })
            
            it('returns an error when stream not found', function (done) {
                multichain.StreamItemsByKey("InvalidStream", "InvalidKey", function (error, items) {
                    expect(error).to.exist
                    expect(error.message).to.equal('Stream with this name not found: InvalidStream')
                    done()
                })
            })
        })
        
        describe('StreamItemsByPublisher', () => {
            const mockStreamPublisher = "1Ej2dEzyGd4o47XQRxkRNMkJE8TMNNaher"

            // see StreamItemsByKey
            it('callback includes error and does not call stream items if error generated during listStreamPublisherItems')
            
            it('throws not connected error when no valid connection is present', function(done) {
                var empty_multichain = new Multichain()
                empty_multichain.StreamItemsByPublisher(mockStreamName, mockStreamPublisher, function (error, info) {
                    expect(info).to.not.exist
                    expect(error.name).to.equal('MultichainError')
                    expect(error.message).to.equal('An unexpected error occurred in multichain, are you connected?')
                    expect(error.cause.name).to.equal('TypeError')
                    expect(error.cause.message).to.equal('this.multichain.listStreamPublisherItems is not a function')
                    done()
                })
            })

            it('returns a stream of items by publisher', function (done) {
                multichain.StreamItemsByPublisher(mockStreamName, mockStreamPublisher, function (error, items) {
                    expect(error).to.not.exist
                    expect(items).to.exist
                    expect(items).to.not.be.empty
                    expect(items[0].value).to.equal(mockStreamValue)
                    done()
                })
            })

            it('returns an error when stream not found', function (done) {
                multichain.StreamItemsByPublisher("InvalidStream", mockStreamPublisher, function (error, items) {
                    expect(error).to.exist
                    expect(error.message).to.equal('Stream with this name not found: InvalidStream')
                    done()
                })
            })
        })
    })

    describe('Address', () => {
        it('ImportAddress throws not connected error when no valid connection is present', function(done) {
            var empty_multichain = new Multichain()
            empty_multichain.ImportAddress(mock.import.from.address, mock.import.to.address, function (error, info) {
                expect(info).to.not.exist
                expect(error.name).to.equal('MultichainError')
                expect(error.message).to.equal('An unexpected error occurred in multichain, are you connected?')
                expect(error.cause.name).to.equal('TypeError')
                expect(error.cause.message).to.equal('this.multichain.importAddress is not a function')
                done()
            })
        })

        it('GrantPermissionToAddress throws not connected error when no valid connection is present', function(done) {
            var empty_multichain = new Multichain()
            empty_multichain.GrantPermissionToAddress(mock.import.from.address, "send,receive", function (error, info) {
                expect(info).to.not.exist
                expect(error.name).to.equal('MultichainError')
                expect(error.message).to.equal('An unexpected error occurred in multichain, are you connected?')
                expect(error.cause.name).to.equal('TypeError')
                expect(error.cause.message).to.equal('this.multichain.grant is not a function')
                done()
            })
        })

        it('RevokePermissionToAddress throws not connected error when no valid connection is present', function(done) {
            var empty_multichain = new Multichain()
            empty_multichain.RevokePermissionToAddress(mock.import.from.address, "send,receive", function (error, info) {
                expect(info).to.not.exist
                expect(error.name).to.equal('MultichainError')
                expect(error.message).to.equal('An unexpected error occurred in multichain, are you connected?')
                expect(error.cause.name).to.equal('TypeError')
                expect(error.cause.message).to.equal('this.multichain.revoke is not a function')
                done()
            })
        })

        it('imports an address', function (done) {
            multichain.ImportAddress(mock.import.from.address, "TestFromAddress", function (error, result) {
                expect(error).to.not.exist
                multichain.ImportAddress(mock.import.to.address, "TestToAddress", function (error, result) {
                    expect(error).to.not.exist
                    done()
                })
            })
        })

        it('allows granting of permissions', (done) => {
            multichain.GrantPermissionToAddress(mock.import.from.address, "send,receive", function (error, result) {
                expect(error).to.not.exist
                expect(result).to.exist
                done()
            })
        })

        it('allows revoking of permissions', (done) => {
            multichain.RevokePermissionToAddress(mock.import.from.address, "send,receive", function (error, result) {
                expect(error).to.not.exist
                expect(result).to.exist
                done()
            })
        })

        it('allows creation of raw signed transaction', function (done) {
            multichain.GrantPermissionToAddress(mock.import.from.address, "send,receive", function (error, result) {
                multichain.CreateAndSignSend(mock.import.from.key, mock.import.to.address, "virtual", 1, function (error, raw) {
                    expect(raw.complete).to.be.true
                    done()
                })
            })
        })

        // see StreamItemsByKey
        it ('invokes callback with delegation errors when unhandled exceptions occur during CreateAndSignSend')

        it('allows sending of raw signed transaction', function (done) {
            multichain.GrantPermissionToAddress(mock.import.to.address, "send,receive", function (error, result) {
                multichain.GrantPermissionToAddress(mock.import.from.address, "send,receive", function (error, result) {
                    multichain.CreateAndSignSend(mock.import.from.key, mock.import.to.address, "virtual", 1, function (error, signed) {
                        multichain.SendSignedTransaction(signed.hex.toString("hex"), function (error, transaction_id) {
                            expect(transaction_id).to.exist
                            done()
                        })
                    })
                })
            })
        })
    })

    describe('Asset', () => {
        var rnd, asset, emblem
        before(function () {
            rnd = Math.floor(Math.random() * (1000000 - 1) + 1)
            asset = "testasset" + rnd.toString()
            emblem = "emblem-" + rnd.toString()
        })

        // see StreamItemsByKey
        it ('getAssetBalance error handling')

        // Is there a test that asserts what's supposed to happen?
        it ('getAssetBalance happy path')

        it('Issue throws not connected error when no valid connection is present', function(done) {
            var empty_multichain = new Multichain()
            empty_multichain.Issue(mock.multichain.address, asset, 2, function (error, info) {
                expect(info).to.not.exist
                expect(error.name).to.equal('MultichainError')
                expect(error.message).to.equal('An unexpected error occurred in multichain, are you connected?')
                expect(error.cause.name).to.equal('TypeError')
                expect(error.cause.message).to.equal('this.multichain.issue is not a function')
                done()
            })
        })

        it('IssueMore throws not connected error when no valid connection is present', function(done) {
            var empty_multichain = new Multichain()
            empty_multichain.IssueMore(mock.import.from.address, asset, 1, function (error, info) {
                expect(info).to.not.exist
                expect(error.name).to.equal('MultichainError')
                expect(error.message).to.equal('An unexpected error occurred in multichain, are you connected?')
                expect(error.cause.name).to.equal('TypeError')
                expect(error.cause.message).to.equal('this.multichain.issueMore is not a function')
                done()
            })
        })

        it('SendAssetFrom throws not connected error when no valid connection is present', function(done) {
            var empty_multichain = new Multichain()
            empty_multichain.SendAssetFrom(mock.multichain.address, mock.info.burnaddress, 1, asset, function (error, info) {
                expect(info).to.not.exist
                expect(error.name).to.equal('MultichainError')
                expect(error.message).to.equal('An unexpected error occurred in multichain, are you connected?')
                expect(error.cause.name).to.equal('TypeError')
                expect(error.cause.message).to.equal('this.multichain.sendAssetFrom is not a function')
                done()
            })
        })

        it('issues asset to internal user', (done) => {
            multichain.Issue(mock.multichain.address, asset, 2, function (error, transaction) {
                expect(error).to.not.exist
                expect(transaction).to.exist
                expect(transaction).to.not.be.empty
                done()
            })
        })

        it('issues more of an asset to external user', (done) => {
            multichain.IssueMore(mock.import.from.address, asset, 1, function (error, transaction) {
                expect(error).to.not.exist
                expect(transaction).to.exist
                expect(transaction).to.not.be.empty
                done()
            })
        })

        it('sends asset from internal user to burn address', (done) => {
            multichain.SendAssetFrom(mock.multichain.address, mock.info.burnaddress, 1, asset, function (error, transaction) {
                expect(error).to.not.exist
                expect(transaction).to.exist
                expect(transaction).to.not.be.empty
                done()
            })
        })

        it('sends asset from an externally signed transaction to burn address', function (done) {
            multichain.CreateAndSignSend(mock.import.from.key, mock.info.burnaddress, asset, 1, function (error, signed) {
                multichain.SendSignedTransaction(signed.hex.toString("hex"), function (error, transaction_id) {
                    expect(error).to.not.exist
                    expect(transaction_id).to.exist
                    expect(transaction_id).to.not.be.empty
                    done()
                })
            })
        })

        it.skip('creates an exchange transaction', function (done) {
            //https://www.multichain.com/qa/5660/issue-locking-unspent-output
            this.timeout(100000)
            var multichain = makeConnectedMultichainObject()
            multichain.CreateExchange(mock.multichain.address, asset, "virtual", function (error, raw) {
                console.log('-------- create error', error)
                expect(error).to.not.exist
                console.log('-------- create raw', raw)
                multichain.FinalizeExchange(raw.prepared, raw.unlocks.txid, raw.unlocks.vout, raw.asking, function (error, complete) {
                    console.log('---------Final error', error)
                    console.log('-------- Complete', complete)
                    done()
                })

            })
        })

        it('issues emblem to specified address', function (done) {
            multichain.IssueEmblem(mock.import.to.address, emblem, function (error, transaction_id) {
                expect(error).to.not.exist
                expect(transaction_id).to.exist
                done()
            })
        })
    })
})
