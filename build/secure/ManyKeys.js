"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coininfo_1 = require("coininfo");
var CoinKey = require("coinkey");
var bitcoin = coininfo_1.coininfo.bitcoin.main;
var bitcoinBitcoreLib = bitcoin.toBitcore();
var ManyKeys = /** @class */ (function () {
    function ManyKeys(seed) {
        if (seed) {
            this.seed = new Buffer(seed, 'hex');
        }
    }
    ManyKeys.prototype.GenKeys = function () {
        this.ck = new CoinKey(this.seed);
        return this.ck;
    };
    ManyKeys.prototype.As = function (type, network) {
        var coin = type;
        if (network) {
            coin = coin + '-' + network;
        }
        this.ck = new CoinKey(this.seed, coininfo_1.coininfo(coin).versions);
        return this.ck;
    };
    ManyKeys.prototype.GetAllAddresses = function () {
        var parent = this;
        var addresses = {};
        Object.keys(coininfo_1.supportedCoins).forEach(function (_coin) {
            addresses[_coin] = new CoinKey(parent.seed, coininfo_1.coininfo(coininfo_1.supportedCoins[_coin].name).versions).publicAddress;
        });
        return addresses;
    };
    ManyKeys.prototype.GetAllKeys = function () {
        var parent = this;
        var addresses = {};
        Object.keys(coininfo_1.supportedCoins).forEach(function (_coin) {
            var key = new CoinKey(parent.seed, coininfo_1.coininfo(coininfo_1.supportedCoins[_coin].name).versions);
            addresses[_coin] = { wif: key.privateWif };
        });
        return addresses;
    };
    ManyKeys.prototype.KeyFromWif = function (wif) {
        var ck = CoinKey.fromWif(wif);
        return { privateKey: ck.privateKey.toString('hex'), address: ck.publicAddress };
    };
    return ManyKeys;
}());
exports.ManyKeys = ManyKeys;
//# sourceMappingURL=ManyKeys.js.map