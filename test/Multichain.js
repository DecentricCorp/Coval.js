"use strict"
let chai = require('chai')
let expect = chai.expect
var Multichain = require("../build/transport/Multichain").Multichain
var MultichainConnection = require("../build/transport/Multichain").MultichainConnection
var path = require("path")
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

            it('returns an empty list when key not found', function (done) {
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
                multichain.CreateAndSignSend(mock.import.from.key, mock.import.to.key, "virtual", 1, function (err, raw) {
                    expect(raw.complete).to.be.true
                    done()
                })
            })
        })
        it('allows sending of raw signed tx', function (done) {
            var multichain = makeConnectedMultichainObject()
            multichain.GrantPermissionToAddress(mock.import.to.address, "send,receive", function (err, result) {
                multichain.GrantPermissionToAddress(mock.import.from.address, "send,receive", function (err, result) {
                    multichain.CreateAndSignSend(mock.import.from.key, mock.import.to.key, "virtual", 1, function (err, signed) {
                        multichain.SendSignedTransaction(signed.hex.toString("hex"), function (err, txid) {
                            // console.log('-------- txid', txid)
                            done()
                        })
                    })
                })
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

let mock = {
    info: {
        version: '1.0 beta 2',
        nodeversion: 10000202,
        protocolversion: 10008,
        chainname: 'Jumper',
        description: 'Jumper',
        protocol: 'multichain',
        port: 7447,
        setupblocks: 60,
        nodeaddress: 'Jumper@10.40.2.44:7447',
        burnaddress: '1XXXXXXXXXXXXXXXXXXXXXXXXXXYd6Aru',
        incomingpaused: false,
        miningpaused: false,
        walletversion: 60000,
        balance: 0,
        walletdbversion: 2,
        reindex: false,
        blocks: 852206,
        timeoffset: 0,
        connections: 2,
        proxy: '',
        difficulty: 6e-8,
        testnet: false,
        keypoololdest: 1502290663,
        keypoolsize: 2,
        paytxfee: 0,
        relayfee: 0,
        errors: ''
    },
    streams: [
        {
            name: 'root',
            createtxid: '8618b77a6082376711d9121ac2ed2c3f561cfdac39f531b395ccb7f07378974a',
            streamref: '0-0-0',
            open: true,
            details: {},
            subscribed: true,
            synchronized: true,
            items: 0,
            confirmed: 0,
            keys: 0,
            publishers: 0
        }, {
            name: 'TestStream',
            createtxid: '96cfa9f6a02e8f03cbf55cfbc3c8f4498aa7f05f850e8bd9f7ab47ef2ad4b89f',
            streamref: '852326-267-53142',
            open: true,
            details: {},
            subscribed: false
        }
    ],
    streamitem: {
        key: 'TestItem',
        value: 'TestValue',
        items: [
            {
                publishers: ['1BBfgYFLsXRThB4pfrdJLkQHUTk8z6opSk'],
                key: 'TestItem',
                data: '5465737456616c7565',
                confirmations: 35,
                blockhash: '0018090f940ca4de0d573c6a3de098eddc5437d22d604d05700986d9903a791e',
                blockindex: 1,
                blocktime: 1515168499,
                txid: '0751761133d509b1ed83d9bf76ff0956f6d84d1785e34fb26be31f9e5f6367c4',
                vout: 0,
                valid: true,
                time: 1515168490,
                timereceived: 1515168490
            }
        ]
    },
    import: {
        from: {
            address: '1NqeStawXbYLB5pKCd296fKgrpGxoiDKHd',
            key: {
                seed: 'b024ad77b56fdab85b53f38014c69a532b21a938bf501f6f31a79a8c936d4544',
                key: {
                    "network": "livenet", "depth": 0, "fingerPrint": -1402895581, "parentFingerPrint": 0, "childIndex": 0, "chainCode": "caf57f46a56b458132742b7fdc87342a1ca0ade4e110601ac1f915bd843b7a6a", "privateKey": "98f6e3d1c09bd4656a24b7015962ec8671b8033a6138ed5b86d65ea2fd08d92e", "checksum": 1818171384, "xprivkey": "xprv9s21ZrQH143K45ZBzC6Rx6CLdiUNwLenjD9LeX5MVTH7YPD16RpdovAA3LtGJjgoygfqgV7TmL2eCeypHMqVaCQYbGwkrF2VivLmfx2rD8T"
                },
                address: '1NqeStawXbYLB5pKCd296fKgrpGxoiDKHd'
            }
        }, to: {
            address: '19CajoMnBL53YooWXMTr3qdaaZS1yj6eaW',
            key: {
                seed: "4b2bed408c7803e966565af5e3dbeeb1736223b83fd11d64857ce58aec2bad9b",
                key: {
                    "network": "livenet", "depth": 0, "fingerPrint": 2135691298, "parentFingerPrint": 0, "childIndex": 0, "chainCode": "c2a2c0eb36613af104a0983c5b7dbb00b602d6498c04e468b1d2f8079b801577", "privateKey": "890bb9e1ecd9c550c80ed2ed219bcf8628d418de1a4acdbc3ce1ab5f21d1e647", "checksum": 1231112784, "xprivkey": "xprv9s21ZrQH143K3zkRo56K6TbqHvgFxZzEDGZrWmnY1QDUKWgD2Ui81d9uG6qww3e6v187zJbhkaqYrYSvXytsvhUgvgpK5S4DT8uWBWYukvK"
                },
                address: '19CajoMnBL53YooWXMTr3qdaaZS1yj6eaW'
            }
        }
    }
}
