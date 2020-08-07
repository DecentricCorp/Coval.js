"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var coininfo_1 = require("coininfo");
var CoinKey = require("coinkey");
var bitcoin = coininfo_1.coininfo.bitcoin.main;
var bitcoinBitcoreLib = bitcoin.toBitcore();
var ManyKeys = /** @class */ (function () {
    function ManyKeys(seed) {
        if (seed) {
            this.seed = Buffer.from(seed, 'hex');
        }
    }
    ManyKeys.prototype.GenKeys = function () {
        this.ck = new CoinKey(this.seed);
        return this.ck;
    };
    ManyKeys.prototype.As = function (type, network) {
        this.ck = new CoinKey(this.seed, coininfo_1.coininfo(network ? type + '-' + network : type).versions);
        return this.ck;
    };
    ManyKeys.prototype.GetAllAddresses = function () {
        var _this = this;
        return Object.keys(coininfo_1.supportedCoins)
            .map(function (coin) { return _this.createAddressDict(coin); })
            .reduce(function (address1, address2) { return ManyKeys.combineDicts(address1, address2); });
    };
    ManyKeys.prototype.GetAllKeys = function () {
        var _this = this;
        return Object.keys(coininfo_1.supportedCoins)
            .map(function (coin) { return _this.createKeyDict(coin); })
            .reduce(function (key1, key2) { return ManyKeys.combineDicts(key1, key2); });
    };
    ManyKeys.prototype.KeyFromWif = function (wif) {
        var ck = CoinKey.fromWif(wif);
        return { privateKey: ck.privateKey.toString('hex'), address: ck.publicAddress };
    };
    ManyKeys.prototype.createAddressDict = function (coin) {
        var addresses = {};
        addresses[coin] = { address: this.createCoinKey(coin).publicAddress, unit: coininfo_1.supportedCoins[coin].unit };
        return addresses;
    };
    ManyKeys.prototype.createKeyDict = function (coin) {
        var keys = {};
        keys[coin] = { wif: this.createCoinKey(coin).privateWif, unit: coininfo_1.supportedCoins[coin].unit };
        return keys;
    };
    ManyKeys.prototype.createCoinKey = function (coin) {
        var ck = new CoinKey(this.seed, coininfo_1.coininfo(coininfo_1.supportedCoins[coin].name).versions);
        return ck;
    };
    ManyKeys.combineDicts = function (item1, item2) {
        return __assign({}, item1, item2);
    };
    return ManyKeys;
}());
exports.ManyKeys = ManyKeys;
//# sourceMappingURL=ManyKeys.js.map