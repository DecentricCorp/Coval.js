"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bitcoin = require("bitcoinjs-lib");
var bip32 = require("bip32");
var coininfo_1 = require("coininfo");
var GenerateKey = /** @class */ (function () {
    function GenerateKey() {
    }
    GenerateKey.prototype.GenerateRandomKeyPair = function (rng) {
        var keyPair = bitcoin.ECPair.makeRandom({ rng: rng });
        return keyPair;
    };
    GenerateKey.prototype.CalculateBip32 = function (seed, coin) {
        var root = bip32.fromSeed(Buffer.from(seed, 'hex'), coininfo_1.supportedCoins[coin].toBitcoinJS());
        var address = bitcoin.payments.p2pkh({ pubkey: root.publicKey, network: coininfo_1.supportedCoins[coin].toBitcoinJS() }).address;
        return { pk: root, pubkey: root.publicKey, address: address };
    };
    return GenerateKey;
}());
exports.GenerateKey = GenerateKey;
//# sourceMappingURL=GenerateKey.js.map