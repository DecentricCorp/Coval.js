"use strict"

import * as MultichainLib from "multichain-node"
import * as UtilLib from "../Utils"
import * as HDKeyLib from "../secure/HDKey"

export class Multichain {
    multichain: { [x: string]: any; };
    Utils
    constructor(public address: string, connection?: MultichainConnection, public asset?: string, public permissions?: string[]) {
        this.Utils = new UtilLib.Utils()
        if (connection)
            this.multichain = MultichainLib(connection)
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
        this.multichain.importAddress([{address: address, label: name, rescan: 'false'}], function(a,b){
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
        var HDKey = new HDKeyLib.HDKey()
        var rawRequest = {}
        rawRequest[to.address] = {}
        rawRequest[to.address][asset] = Number(qty)
        var parent = this
        parent.multichain.createRawSendFrom([from.address, rawRequest], function (err, raw) {
            from.wif = HDKey.DeriveKeyWif(from, 0)
            parent.multichain.signRawTransaction([raw, [], [from.wif.wif]], function (err, signed) {
                return callback(err, signed)
            })
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
}

export class MultichainConnection {
    constructor(public port: Number, public host: string, public user: string, public pass: string){}
}