"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coininfo = require("coininfo");
var CoinKey = require("coinkey");
var bitcoin = coininfo.bitcoin.main;
var bitcoinBitcoreLib = bitcoin.toBitcore();
var ManyKeys = /** @class */ (function () {
    function ManyKeys(seed) {
        this.coins = [
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
        ];
        this.seed = new Buffer(seed, 'hex');
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
        this.ck = new CoinKey(this.seed, coininfo(coin).versions);
        return this.ck;
    };
    ManyKeys.prototype.GetAllAddresses = function () {
        var parent = this;
        var addresses = {};
        this.coins.forEach(function (coin) {
            addresses[coin] = new CoinKey(parent.seed, coininfo(coin).versions).publicAddress;
        });
        return addresses;
    };
    return ManyKeys;
}());
exports.ManyKeys = ManyKeys;
//# sourceMappingURL=ManyKeys.js.map