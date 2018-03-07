"use strict"

import * as MultichainLib from "multichain-node"
import * as UtilLib from "../Utils"
import * as HDKeyLib from "../secure/HDKey"
import { MultichainError } from "../base/Error"

export class Multichain {
    multichain: { [x: string]: any; }
    Utils
    constructor(public address?: string, connection?: MultichainConnection, public asset?: string, public permissions?: string[]) {
        this.Utils = new UtilLib.Utils()
        if (connection) {
            this.multichain = MultichainLib(connection)
        } else {
            this.multichain = Multichain.makeConnectedMultichainObject()
        }
    }

    static makeConnectionFromEnv():MultichainConnection {
        return new MultichainConnection(
            Number(process.env.MULTICHAINport),
            process.env.MULTICHAINhost,
            process.env.MULTICHAINuser,
            process.env.MULTICHAINpass
        )
    }

    static makeConnectedMultichainObject():Multichain {
        return new Multichain(process.env.MULTICHAINADDRESS, Multichain.makeConnectionFromEnv())
    }

    Info(callback:(error:any, result:any) => void):void {
        try {
            this.multichain.getInfo(callback)
        } catch (error) {
            callback(new MultichainError(error), null)
        }
    }

    Connect(connection: MultichainConnection):void {
        this.multichain = MultichainLib(connection)
    }

    Streams(callback:(error:any, result:any) => void):void {
        try {
            this.multichain.listStreams(callback)
        } catch (error) {
            callback(new MultichainError(error), null)
        }
    }

    StreamItemsByKey(streamName:string, key:string, callback:(error:any, result:any) => void):void {
        try {
            this.multichain.listStreamKeyItems({
                stream: streamName,
                key: key,
                verbose: true
            }, (error, items) => {
                if (!!error) {
                    callback(error, null)
                } else {
                    this._StreamItems(null, items, callback)
                }
            })
        } catch (error) {
            callback(new MultichainError(error), null)
        }
    }

    StreamItemsByPublisher(streamName, publisherAddress, callback):void {
        try {
            this.multichain.listStreamPublisherItems({
                stream: streamName,
                address: publisherAddress,
                verbose: true
            }, (error, items) => {
                if (!!error) {
                    callback(error, null)
                } else {
                    return this._StreamItems(null, items, callback)
                }
            })
        } catch (error) {
            callback(new MultichainError(error), null)
        }
    }

    GrantPermissionToAddress(addresses, permissions, callback) {
        try {
            this.multichain.grant({
                addresses: addresses,
                permissions: permissions
            }, callback)
        } catch (error) {
            callback(new MultichainError(error), null)
        }
    }

    RevokePermissionToAddress(address, permissions, callback) {
        try {
            this.multichain.revoke({
                addresses: address,
                permissions: permissions
            }, callback)
        } catch (error) {
            callback(new MultichainError(error), null)
        }
    }

    ImportAddress(address, name, callback) {
        try {
            this.multichain.importAddress({
                address: address,
                label: name,
                rescan: false
            }, callback)
        } catch (error) {
            callback(new MultichainError(error), null)
        }
    }

    ImportPrivKey(key, callback) {
        this.multichain.importPrivKey([key], callback)
    }

    SendSignedTransaction(signed, callback) {
            this.multichain.sendRawTransaction([signed.toString("hex")], callback)
        }

    CreateAndSignSend(from, to, asset, qty, callback) {
        var rawRequest = {}
        rawRequest[to] = {}

        // TODO: Use promise with async and await instead of callback, to avoid race condition
        rawRequest[to][asset] = () => Number(qty)
        var parent = this
        parent.multichain.createRawSendFrom([from.address, rawRequest], function (error, raw) {
            parent.SignRaw(from, raw, callback)
        })
    }

    SignRaw(from, hex, callback) {
        var HDKey = new HDKeyLib.HDKey()
        from.wif = HDKey.DeriveKeyWif(from, 0)
        var parent = this
        try {
            parent.multichain.signRawTransaction([hex, [], [from.wif.wif]], callback)
        } catch (error) {
            callback(new MultichainError(error), null)
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
            callback(new MultichainError(error), null)
        }
    }

    SendAssetFrom(from, to, amount, asset, callback) {
        try {
            this.multichain.sendAssetFrom({
                from: from,
                to: to,
                asset: asset,
                qty: amount
            }, callback)
        } catch (error) {
            callback(new MultichainError(error), null)
        }
    }

    Issue(to, name, qty, callback) {
        try {
            this.multichain.issue({
                address: to,
                asset: { name: name, open: true },
                qty: qty,
                units: 1
            }, callback)
        } catch (error) {
            callback(new MultichainError(error), null)
        }
    }

    IssueMore(to, name, qty, callback) {
        try {
            this.multichain.issueMore({
                address: to,
                asset: name,
                qty: qty
            }, callback)
        } catch (error) {
            callback(new MultichainError(error), null)
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
                callback(new MultichainError(error), null)
            }
        })
    }

    FinalizeExchange(hex, txid, vout, assets, callback) {
        try {
            this.multichain.completeRawExchange({
                hexstring: hex,
                txid: txid,
                vout: vout,
                assets: assets,
                data: ''
            }, callback)
        } catch (error) {
            callback(new MultichainError(error), null)
        }
    }

    PrepareUnlockFrom(from, assets, callback) {
        try {
            this.multichain.prepareLockUnspentFrom({
                from: from,
                assets: assets,
                lock: true
            }, callback)
        } catch (error) {
            callback(new MultichainError(error), null)
        }
    }

    PrepareUnlock(assets, callback) {
        try {
            this.multichain.prepareLockUnspent({
                assets: assets,
                lock: false
            }, callback)
        } catch (error) {
            callback(new MultichainError(error), null)
        }
    }

    IssueEmblem(to, assetName, callback) {
        this.Issue(to, assetName, 1, callback)
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