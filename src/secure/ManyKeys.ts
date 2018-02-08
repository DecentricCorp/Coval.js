"use strict"
import * as bitcore from "bitcore"
import * as coininfo from "coininfo"
import * as CryptoJS from "crypto-js"
import * as _Utils from "../Utils"
import {Envelope} from "../transport/Envelope"
import * as CoinKey from "coinkey"
let bitcoin = coininfo.bitcoin.main
let bitcoinBitcoreLib = bitcoin.toBitcore()

export class ManyKeys {
    seed: any;
    ck: any;
    public coins = [
        'blk',
        'btc',
        'btg',
        'dash',
        'dcr',
        'dgb',
        'doge',
        'ltc',
        'mona',
        'nbt',
        'nmc',
        'ppc',
        'qtum',
        'rdd',
        'vtc',
        'zec'
    ]
    constructor(seed) {
        this.seed = new Buffer(seed, 'hex')
    }

    GenKeys() {
        this.ck = new CoinKey(this.seed)
        return this.ck
    }

    As(type, network?) {
        let coin = type
        if (network) {
            coin = coin + '-' + network
        } 
        this.ck = new CoinKey(this.seed, coininfo(coin).versions)
        return this.ck
    }

    GetAllAddresses() {
        var parent = this
        var addresses = {}
        this.coins.forEach(function(coin){
            addresses[coin] = new CoinKey(parent.seed, coininfo(coin).versions).publicAddress
        })
        return addresses
    }

    
}