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
        this.multichain.getInfo((err, info) => {
            return callback(err, info)
        })
    }

    Connect(connection: MultichainConnection) {
        this.multichain = MultichainLib(connection)
    }

    Streams(callback) {
        this.multichain.listStreams((err, streams) => {
            return callback(err, streams)
        })
    }

    StreamItemsByKey(streamName, key, callback) {
        let Utils = this.Utils
        this.multichain.listStreamKeyItems({
            stream: streamName,
            key: key,
            verbose: true
        }, function (error, items) {
            var itemArray = []
            if(items && items.length > 0) {
                items.forEach(function (element, index) {
                    var item = element                
                    item.value = Utils.HexToAscii(element.data)
                    itemArray[index] = item
                    if (index == items.length -1) {
                        return callback(error, itemArray)
                    }
                })
            } else {
                return callback(error, itemArray)
            }
        })
    }
    /* TODO: refactor like StreamItemsByKey */
    StreamItemsByPublisher(streamName, publisherAddress, cb) {
        let Utils = this.Utils
        this.multichain.listStreamPublisherItems({
            stream: streamName,
            address: publisherAddress,
            verbose: true
        }, function (error, items) {
            var itemArray = []
            if (error) { return cb(error, null) } 
            items.forEach(function (element, index) {
                var item = Utils.HexToAscii(element.data)
                return cb(null, item)
            }, this)
        })
    }

    GrantPermissionToAddress(addresses, permissions, callback){
        this.multichain.grant({addresses: addresses, permissions: permissions}, function(a,b){
            return callback(a,b)
        })
    }

    RevokePermissionToAddress(address, permissions, callback){
        this.multichain.revoke({ addresses: address, permissions: permissions }, function(err, result){
            return callback(err, result)
        })
    }

    ImportAddress(address, name, callback){
        this.multichain.importAddress({address: address, label: name, rescan: false}, function(a,b){
            return callback(a,b)
        })
    }

    ImportPrivKey(key, callback){
        this.multichain.importPrivKey([key], function(a,b){
            return callback(a,b)
        })
    }

    SendSignedTransaction(signed, callback) {
        this.multichain.sendRawTransaction([signed.toString("hex")], function(err, txid){
            return callback(err, txid)
        })
    }

    CreateAndSignSend(from, to, asset, qty, callback) {
        //var HDKey = new HDKeyLib.HDKey()
        var rawRequest = {}
        rawRequest[to] = {}
        rawRequest[to][asset] = Number(qty)
        var parent = this
        parent.multichain.createRawSendFrom([from.address, rawRequest], function (err, raw) {
            //from.wif = HDKey.DeriveKeyWif(from, 0)
            /* parent.multichain.signRawTransaction([raw, [], [from.wif.wif]], function (err, signed) {
                return callback(err, signed)
            }) */
            parent.SignRaw(from, raw, function(err, signed){
                return callback(err, signed)
            })
        })
    }

    SignRaw(from, hex, callback) {
        var HDKey = new HDKeyLib.HDKey()
        from.wif = HDKey.DeriveKeyWif(from, 0)
        var parent = this
        parent.multichain.signRawTransaction([hex, [], [from.wif.wif]], function (err, signed) {
            return callback(err, signed)
        })
    }

    GetAssetBalance(address, asset, callback){
        this.multichain.getAddressBalances({
            minconf: 0,
            address: address
        }, function(err, result){
            var balance = 0
            var filtered = result.filter(function(a){return a.name === asset})
            if (filtered.length > 0) {
                balance = filtered[0].qty
            }
            return callback(null, balance)
        })
    }

    SendAssetFrom(from, to, amount, asset, callback){
        this.multichain.sendAssetFrom({
            from: from,
            to: to,
            asset: asset,
            qty: amount
        }, function(a,b){
            return callback(a,b)
        })
    }

    Issue(to, name, qty, callback) {
        this.multichain.issue({address: to, asset: { name:name, open: true }, qty: qty, units: 1}, function(a,b){
            return callback(a,b)
        })
    }

    IssueMore(to, name, qty, callback) {
        this.multichain.issueMore({address: to, asset: name, qty: qty}, function(a,b){
            return callback(a,b)
        })
    }

    CreateExchange(from, asset, asking, callback) {
        var parent = this
        var assets = {} 
        var ask = {}
        assets[asset] =  1
        ask[asking] = 1
        this.PrepareUnlockFrom(from, assets, function(err, unlocks){
            var payload =  {unlocks: unlocks, prepared: '', offer: assets, asking: ask}
            parent.multichain.createRawExchange({txid: payload.unlocks.txid, vout: payload.unlocks.vout, assets: ask}, function(err, raw){
                payload.prepared = raw
                return callback(err, payload)
            })            
        })        
    }

    FinalizeExchange(hex, txid, vout, assets, callback) {
    //console.log('--------- request', completeRequest)
        this.multichain.completeRawExchange({hexstring: hex, txid: txid, vout: vout, assets: assets, data: ''}, function(err, complete){
            console.log('-------- Error', err)
            console.log('-------- Complete', complete)
            return callback(err, complete)
        })
    }
 
    PrepareUnlockFrom(from, assets, callback) {
        this.multichain.prepareLockUnspentFrom({from: from, assets: assets, lock: true}, function(a,b){
            return callback(a,b)
        })
    }

    PrepareUnlock(assets, callback) {
        this.multichain.prepareLockUnspent({assets: assets, lock: false}, function(a,b){
            return callback(a,b)
        })
    }

    IssueEmblem(to, assetName, callback) {
        this.Issue(to, assetName, 1, function(err, tx){
            return callback(err, tx)
        })
    }
}

export class MultichainConnection {
    constructor(public port: Number, public host: string, public user: string, public pass: string){}
}