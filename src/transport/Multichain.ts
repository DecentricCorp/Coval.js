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
        } catch (error) {
            if (this._isNotConnectedError(error, 'getInfo'))
                error = this._convertToNotConnectedError(error)
            callback(error, null)
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
        } catch (error) {
            if (this._isNotConnectedError(error, 'listStreams'))
                error = this._convertToNotConnectedError(error)
            callback(error, null)
        }
    }

    StreamItemsByKey(streamName, key, callback) {
        try {
            this.multichain.listStreamKeyItems({
                stream: streamName,
                key: key,
                verbose: true
            }, (error, items) => { return this._StreamItems(error, items, callback) })
        } catch (error) {
            if (this._isNotConnectedError(error, 'listStreamKeyItems'))
                error = this._convertToNotConnectedError(error)
            callback(error, null)
        }
    }

    StreamItemsByPublisher(streamName, publisherAddress, callback) {
        try {
            this.multichain.listStreamPublisherItems({
                stream: streamName,
                address: publisherAddress,
                verbose: true
            }, (error, items) => { return this._StreamItems(error, items, callback) })
        } catch (error) {
            if (this._isNotConnectedError(error, 'listStreamPublisherItems'))
                error = this._convertToNotConnectedError(error)
            callback(error, null)
        }
    }

    GrantPermissionToAddress(addresses, permissions, callback) {
        try {
            this.multichain.grant({
                addresses: addresses,
                permissions: permissions
            }, function (error, result) {
                return callback(error, result)
            })
        } catch (error) {
            if (this._isNotConnectedError(error, 'grant'))
                error = this._convertToNotConnectedError(error)
            callback(error, null)
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
        } catch (error) {
            if (this._isNotConnectedError(error, 'revoke'))
                error = this._convertToNotConnectedError(error)
            callback(error, null)
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
        } catch (error) {
            if (this._isNotConnectedError(error, 'importAddress'))
                error = this._convertToNotConnectedError(error)
            callback(error, null)
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
        } catch (error) {
            if (this._isNotConnectedError(error, 'signRawTransaction'))
                error = this._convertToNotConnectedError(error)
            callback(error, null)
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
        } catch (error) {
            if (this._isNotConnectedError(error, 'getAddressBalances'))
                error = this._convertToNotConnectedError(error)
            callback(error, null)
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
        } catch (error) {
            if (this._isNotConnectedError(error, 'sendAssetFrom'))
                error = this._convertToNotConnectedError(error)
            callback(error, null)
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
        } catch (error) {
            if (this._isNotConnectedError(error, 'issue'))
                error = this._convertToNotConnectedError(error)
            callback(error, null)
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
        } catch (error) {
            if (this._isNotConnectedError(error, 'issueMore'))
                error = this._convertToNotConnectedError(error)
            callback(error, null)
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
            } catch (error) {
                if (this._isNotConnectedError(error, 'createRawExchange'))
                    error = this._convertToNotConnectedError(error)
                callback(error, null)
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
        } catch (error) {
            if (this._isNotConnectedError(error, 'completeRawExchange'))
               error = this._convertToNotConnectedError(error)
            callback(error, null)
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
        } catch (error) {
            if (this._isNotConnectedError(error, 'prepareLockUnspentFrom'))
               error = this._convertToNotConnectedError(error)
            callback(error, null)
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
        } catch (error) {
            if (this._isNotConnectedError(error, 'prepareLockUnspent'))
                error = this._convertToNotConnectedError(error)
            callback(error, null)
        }
    }

    IssueEmblem(to, assetName, callback) {
        this.Issue(to, assetName, 1, function (error, transaction) {
            return callback(error, transaction)
        })
    }

    _convertToNotConnectedError(error) {
        error.name = 'NotConnectedError'
        error.message = 'multichain has no active connection'
        return error
    }

    _isNotConnectedError(error, subFunctionName) {
        return error.name == 'TypeError' && error.message == `this.multichain.${subFunctionName} is not a function`
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
}

export class MultichainConnection {
    constructor(
        public port: Number,
        public host: string,
        public user: string,
        public pass: string) { }
}