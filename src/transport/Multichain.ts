"use strict"

import * as MultichainLib from "multichain-node"
import * as UtilLib from "../Utils"
import * as HDKeyLib from "../secure/HDKey"
import { NotConnectedError } from "../base/Error";

export class Multichain {
    multichain: { [x: string]: any; };
    Utils
    constructor(public address?: string, connection?: MultichainConnection, public asset?: string, public permissions?: string[]) {
        this.Utils = new UtilLib.Utils()
        if (connection) {
            this.multichain = MultichainLib(connection)
        } else {
            this.multichain = this.makeConnectedMultichainObject()
        }
    }

    makeConnectionFromEnv() {
        return new MultichainConnection(
            Number(process.env.MULTICHAINport),
            process.env.MULTICHAINhost,
            process.env.MULTICHAINuser,
            process.env.MULTICHAINpass
        )
    }

    makeConnectedMultichainObject() {
        return new Multichain(process.env.MULTICHAINADDRESS, this.makeConnectionFromEnv())
    }

    Info(callback) {
        try {
            this.multichain.getInfo((error, info) => {
                return callback(error, info)
            })
        } catch (TypeError) {
            if (TypeError.message == 'this.multichain.getInfo is not a function')
                throw new NotConnectedError('multichain has no active connection')
            throw TypeError
        }
    }

    Connect(connection: MultichainConnection) {
        this.multichain = MultichainLib(connection)
    }

    Streams(callback) {
        try {
            this.multichain.listStreams((error, streams) => {
                return callback(error, streams)
            })
        } catch (TypeError) {
            if (TypeError.message == 'this.multichain.listStreams is not a function')
                throw new NotConnectedError('multichain has no active connection')
            throw TypeError
        }
    }

    StreamItemsByKey(streamName, key, callback) {
        try {
            this.multichain.listStreamKeyItems({
                stream: streamName,
                key: key,
                verbose: true
            }, (error, items) => { return this._StreamItems(error, items, callback) })
        } catch (TypeError) {
            if (TypeError.message == 'this.multichain.listStreamKeyItems is not a function')
                throw new NotConnectedError('multichain has no active connection')
            throw TypeError
        }
    }

    StreamItemsByPublisher(streamName, publisherAddress, callback) {
        try {
            this.multichain.listStreamPublisherItems({
                stream: streamName,
                address: publisherAddress,
                verbose: true
            }, (error, items) => { return this._StreamItems(error, items, callback) })
        } catch (TypeError) {
            if (TypeError.message == 'this.multichain.listStreamPublisherItems is not a function')
                throw new NotConnectedError('multichain has no active connection')
            throw TypeError
        }
    }

    _StreamItems(error, items, callback) {
        var itemArray = []
        if (items && items.length > 0)
            itemArray = this._elementValueCompute(items)
        return callback(error, itemArray)
    }

    _elementValueCompute(items) {
        let Utils = this.Utils
        return items.map(function (element) {
            element.value = Utils.HexToAscii(element.data)
            return element
        })
    }

    GrantPermissionToAddress(addresses, permissions, callback) {
        try {
            this.multichain.grant({
                addresses: addresses,
                permissions: permissions
            }, function (error, result) {
                return callback(error, result)
            })
        } catch (TypeError) {
            if (TypeError.message == 'this.multichain.grant is not a function')
                throw new NotConnectedError('multichain has no active connection')
            throw TypeError
        }
    }

    RevokePermissionToAddress(address, permissions, callback) {
        try {
            this.multichain.revoke({
                addresses: address,
                permissions: permissions
            }, function (error, result) {
                return callback(error, result)
            })
        } catch (TypeError) {
            if (TypeError.message == 'this.multichain.revoke is not a function')
                throw new NotConnectedError('multichain has no active connection')
            throw TypeError
        }
    }

    ImportAddress(address, name, callback) {
        try {
            this.multichain.importAddress({
                address: address,
                label: name,
                rescan: false
            }, function (error, result) {
                return callback(error, result)
            })
        } catch (TypeError) {
            if (TypeError.message == 'this.multichain.importAddress is not a function')
                throw new NotConnectedError('multichain has no active connection')
            throw TypeError
        }
    }

    ImportPrivKey(key, callback) {
        this.multichain.importPrivKey([key], function (error, result) {
            return callback(error, result)
        })
    }

    SendSignedTransaction(signed, callback) {
            this.multichain.sendRawTransaction([signed.toString("hex")], function (error, transaction_id) {
                return callback(error, transaction_id)
            })
        }

    CreateAndSignSend(from, to, asset, qty, callback) {
        var rawRequest = {}
        rawRequest[to] = {}

        // TODO: Use promise with async and await instead of callback, to avoid race condition
        rawRequest[to][asset] = () => Number(qty)
        var parent = this
            parent.multichain.createRawSendFrom([from.address, rawRequest], function (error, raw) {
                parent.SignRaw(from, raw, function (error, signed) {
                    return callback(error, signed)
                })
            })
        }

    SignRaw(from, hex, callback) {
        var HDKey = new HDKeyLib.HDKey()
        from.wif = HDKey.DeriveKeyWif(from, 0)
        var parent = this
        try {
            parent.multichain.signRawTransaction([hex, [], [from.wif.wif]], function (error, signed) {
                return callback(error, signed)
            })
        } catch (TypeError) {
            if (TypeError.message == 'this.multichain.signRawTransaction is not a function')
                throw new NotConnectedError('multichain has no active connection')
            throw TypeError
        }
    }

    GetAssetBalance(address, asset, callback) {
        try {
            this.multichain.getAddressBalances({
                minconf: 0,
                address: address
            }, function (error, result) {
                var balance = 0
                var filtered = result.filter(function (a) { return a.name === asset })
                if (filtered.length > 0) {
                    balance = filtered[0].qty
                }
                return callback(null, balance)
            })
        } catch (TypeError) {
            if (TypeError.message == 'this.multichain.getAddressBalances is not a function')
                throw new NotConnectedError('multichain has no active connection')
            throw TypeError
        }
    }

    SendAssetFrom(from, to, amount, asset, callback) {
        try {
            this.multichain.sendAssetFrom({
                from: from,
                to: to,
                asset: asset,
                qty: amount
            }, function (error, transaction) {
                return callback(error, transaction)
            })
        } catch (TypeError) {
            if (TypeError.message == 'this.multichain.sendAssetFrom is not a function')
                throw new NotConnectedError('multichain has no active connection')
            throw TypeError
        }
    }

    Issue(to, name, qty, callback) {
        try {
            this.multichain.issue({
                address: to,
                asset: { name: name, open: true },
                qty: qty,
                units: 1
            }, function (error, transaction) {
                return callback(error, transaction)
            })
        } catch (TypeError) {
            if (TypeError.message == 'this.multichain.issue is not a function')
                throw new NotConnectedError('multichain has no active connection')
            throw TypeError
        }
    }

    IssueMore(to, name, qty, callback) {
        try {
            this.multichain.issueMore({
                address: to,
                asset: name,
                qty: qty
            }, function (error, transaction) {
                return callback(error, transaction)
            })
        } catch (TypeError) {
            if (TypeError.message == 'this.multichain.issueMore is not a function')
                throw new NotConnectedError('multichain has no active connection')
            throw TypeError
        }
    }

    CreateExchange(from, asset, asking, callback) {
        var parent = this
        var assets = {}
        var ask = {}
        assets[asset] = 1
        ask[asking] = 1
        this.PrepareUnlockFrom(from, assets, function (error, unlocks) {
            var payload = { unlocks: unlocks, prepared: '', offer: assets, asking: ask }
            try {
                parent.multichain.createRawExchange({
                    txid: payload.unlocks.txid,
                    vout: payload.unlocks.vout,
                    assets: ask
                }, function (error, raw) {
                    payload.prepared = raw
                    return callback(error, payload)
                })
            } catch (TypeError) {
                if (TypeError.message == 'this.multichain.createRawExchange is not a function')
                    throw new NotConnectedError('multichain has no active connection')
                throw TypeError
            }
        })
    }

    FinalizeExchange(hex, txid, vout, assets, callback) {
        //console.log('--------- request', completeRequest)
        try {
            this.multichain.completeRawExchange({
                hexstring: hex,
                txid: txid,
                vout: vout,
                assets: assets,
                data: ''
            }, function (error, complete) {
                console.log('-------- Error', error)
                console.log('-------- Complete', complete)
                return callback(error, complete)
            })
        } catch (TypeError) {
            if (TypeError.message == 'this.multichain.completeRawExchange is not a function')
                throw new NotConnectedError('multichain has no active connection')
            throw TypeError
        }
    }

    PrepareUnlockFrom(from, assets, callback) {
        try {
            this.multichain.prepareLockUnspentFrom({
                from: from,
                assets: assets,
                lock: true
            }, function (error, transaction) {
                return callback(error, transaction)
            })
        } catch (TypeError) {
            if (TypeError.message == 'this.multichain.PrepareUnlockFrom is not a function')
                throw new NotConnectedError('multichain has no active connection')
            throw TypeError
        }
    }

    PrepareUnlock(assets, callback) {
        try {
            this.multichain.prepareLockUnspent({
                assets: assets,
                lock: false
            }, function (error, transaction) {
                return callback(error, transaction)
            })
        } catch (TypeError) {
            if (TypeError.message == 'this.multichain.prepareLockUnspent is not a function')
                throw new NotConnectedError('multichain has no active connection')
            throw TypeError
        }
    }

    IssueEmblem(to, assetName, callback) {
        this.Issue(to, assetName, 1, function (error, transaction) {
            return callback(error, transaction)
        })
    }
}

export class MultichainConnection {
    constructor(
        public port: Number,
        public host: string,
        public user: string,
        public pass: string) { }
}