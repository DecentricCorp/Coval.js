"use strict"
import * as bitcore from "bitcore"
import {coininfo, supportedCoins} from "coininfo"
import * as CryptoJS from "crypto-js"
import * as _Utils from "../Utils"
import {Envelope} from "../transport/Envelope"
import * as CoinKey from "coinkey"
let bitcoin = coininfo.bitcoin.main
let bitcoinBitcoreLib = bitcoin.toBitcore()

export class ManyKeys {
    seed: any;
    ck: any;
    constructor(seed?) {
        if (seed) {
            this.seed = new Buffer(seed, 'hex')
        }
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
        Object.keys(supportedCoins).forEach(_coin => {
            addresses[_coin] = {address: new CoinKey(parent.seed, coininfo(supportedCoins[_coin].name).versions).publicAddress, unit: supportedCoins[_coin].unit }
        })
        return addresses
    }

    GetAllKeys() {
        var parent = this
        var addresses = {}
        Object.keys(supportedCoins).forEach(_coin => {
            var key = new CoinKey(parent.seed, coininfo(supportedCoins[_coin].name).versions)
            addresses[_coin] = {wif: key.privateWif, unit: supportedCoins[_coin].unit}
        })
        return addresses
    }

    KeyFromWif(wif) {
        var ck = CoinKey.fromWif(wif)
        return {privateKey: ck.privateKey.toString('hex'), address: ck.publicAddress}
    }

    
}