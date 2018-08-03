"use strict"
import * as bitcore from "bitcore-lib"
import {coininfo, supportedCoins} from "coininfo"
import * as CryptoJS from "crypto-js"
import * as _Utils from "../Utils"
import { Envelope } from "../transport/Envelope"
import * as CoinKey from "coinkey"
const bitcoin = coininfo.bitcoin.main
const bitcoinBitcoreLib = bitcoin.toBitcore()

export class ManyKeys {
    seed: any;
    ck: any;
    constructor(seed?) {
        if (seed) {
            this.seed = Buffer.from(seed, 'hex')
        }
    }

    GenKeys() {
        this.ck = new CoinKey(this.seed)
        return this.ck
    }

    As(type, network?) {
        this.ck = new CoinKey(this.seed, coininfo(network ? type + '-' + network : type).versions)
        return this.ck
    }

    GetAllAddresses() {
        return Object.keys(supportedCoins)
            .map((coin) => this.createAddressDict(coin))
            .reduce((address1, address2) => ManyKeys.combineDicts(address1, address2))
    }

    GetAllKeys() {
        return Object.keys(supportedCoins)
            .map((coin) => this.createKeyDict(coin))
            .reduce((key1, key2) => ManyKeys.combineDicts(key1, key2))
    }

    KeyFromWif(wif) {
        const ck = CoinKey.fromWif(wif)
        return { privateKey: ck.privateKey.toString('hex'), address: ck.publicAddress }
    }

    createAddressDict(coin) {
        const addresses = {}
        addresses[coin] = { address: this.createCoinKey(coin).publicAddress, unit: supportedCoins[coin].unit }
        return addresses
    }

    createKeyDict(coin) {
        const keys = {}
        keys[coin] = { wif: this.createCoinKey(coin).privateWif, unit: supportedCoins[coin].unit }
        return keys
    }



    createCoinKey(coin) {
        var ck = new CoinKey(this.seed, coininfo(supportedCoins[coin].name).versions)
        return ck
    }

    static combineDicts(item1, item2) {
        return { ...item1, ...item2 }
    }
}