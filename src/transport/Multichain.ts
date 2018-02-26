"use strict"

import * as MultichainLib from "multichain-node"
import * as UtilLib from "../Utils"
import * as HDKeyLib from "../secure/HDKey"

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
        this.multichain.getInfo((error, info) => {
            return callback(error, info)
        })
    }

    Connect(connection: MultichainConnection) {
        this.multichain = MultichainLib(connection)
    }

    Streams(callback) {
        this.multichain.listStreams((error, streams) => {
            return callback(error, streams)
        })
    }

    StreamItemsByKey(streamName, key, callback) {
        this.multichain.listStreamKeyItems({
            stream: streamName,
            key: key,
            verbose: true
        }, (error, items) => { return this._StreamItems(error, items, callback) })
    }

    StreamItemsByPublisher(streamName, publisherAddress, callback) {
        this.multichain.listStreamPublisherItems({
            stream: streamName,
            address: publisherAddress,
            verbose: true
        }, (error, items) => { return this._StreamItems(error, items, callback) })
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
        this.multichain.grant({
            addresses: addresses,
            permissions: permissions
        }, function (error, result) {
            return callback(error, result)
        })
    }

    RevokePermissionToAddress(address, permissions, callback) {
        this.multichain.revoke({
            addresses: address,
            permissions: permissions
        }, function (error, result) {
            return callback(error, result)
        })
    }

    ImportAddress(address, name, callback) {
        this.multichain.importAddress({
            address: address,
            label: name,
            rescan: false
        }, function (error, result) {
            return callback(error, result)
        })
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
        parent.multichain.signRawTransaction([hex, [], [from.wif.wif]], function (error, signed) {
            return callback(error, signed)
        })
    }

    GetAssetBalance(address, asset, callback) {
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
    }

    SendAssetFrom(from, to, amount, asset, callback) {
        this.multichain.sendAssetFrom({
            from: from,
            to: to,
            asset: asset,
            qty: amount
        }, function (error, transaction) {
            return callback(error, transaction)
        })
    }

    Issue(to, name, qty, callback) {
        this.multichain.issue({
            address: to,
            asset: { name: name, open: true },
            qty: qty,
            units: 1
        }, function (error, transaction) {
            return callback(error, transaction)
        })
    }

    IssueMore(to, name, qty, callback) {
        this.multichain.issueMore({
            address: to,
            asset: name,
            qty: qty
        }, function (error, transaction) {
            return callback(error, transaction)
        })
    }

    CreateExchange(from, asset, asking, callback) {
        var parent = this
        var assets = {}
        var ask = {}
        assets[asset] = 1
        ask[asking] = 1
        this.PrepareUnlockFrom(from, assets, function (error, unlocks) {
            var payload = {unlocks: unlocks, prepared: '', offer: assets, asking: ask }
            parent.multichain.createRawExchange({
                txid: payload.unlocks.txid,
                vout: payload.unlocks.vout,
                assets: ask
            }, function (error, raw) {
                payload.prepared = raw
                return callback(error, payload)
            })
        })
    }

    FinalizeExchange(hex, txid, vout, assets, callback) {
        //console.log('--------- request', completeRequest)
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
    }

    PrepareUnlockFrom(from, assets, callback) {
        this.multichain.prepareLockUnspentFrom({
            from: from,
            assets: assets,
            lock: true
        }, function (error, transaction) {
            return callback(error, transaction)
        })
    }

    PrepareUnlock(assets, callback) {
        this.multichain.prepareLockUnspent({
            assets: assets,
             lock: false
            }, function (error, transaction) {
            return callback(error, transaction)
        })
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
        public pass: string) {}
}