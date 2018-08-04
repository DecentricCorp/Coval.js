"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bitcoin = require("bitcoinjs-lib");
var bip32 = require("bip32");
var coininfo_1 = require("coininfo");
var Mnemonic = require("./Mnemonic");
var GenerateKey = /** @class */ (function () {
    function GenerateKey() {
    }
    GenerateKey.prototype.GenerateRandomKeyPair = function (rng, coin) {
        var network = coininfo_1.supportedCoins[coin || "bitcoin"].toBitcoinJS();
        var keyPair = bitcoin.ECPair.makeRandom({ rng: rng, network: network });
        return keyPair;
    };
    GenerateKey.prototype.CalculateBip32 = function (seed, coin) {
        var root = bip32.fromSeed(Buffer.from(seed, 'hex'), coininfo_1.supportedCoins[coin].toBitcoinJS());
        var address = bitcoin.payments.p2pkh({ pubkey: root.publicKey, network: coininfo_1.supportedCoins[coin].toBitcoinJS() }).address;
        return { pk: root, pubkey: root.publicKey, address: address };
    };
    GenerateKey.prototype.CalculateBip32FromPhrase = function (phrase, coin) {
        var mnemonic = new Mnemonic.Mnemonic();
        var seed = mnemonic.ToSeedHex(phrase);
        var network = coininfo_1.supportedCoins[coin].toBitcoinJS();
        //console.log(network)
        var root = bip32.fromSeed(Buffer.from(seed, 'hex'), network);
        var path = "m/0'/1337'/0'/0";
        var child = root.derivePath(path);
        var key = child.derive(0);
        var address = bitcoin.payments.p2pkh({ pubkey: key.publicKey, network: coininfo_1.supportedCoins[coin].toBitcoinJS() }).address;
        //var address = bitcoin.payments.p2wpkh({ pubkey: child.publicKey, network: supportedCoins[coin].toBitcoinJS()}).address
        return { root: root, pubkey: root.publicKey, address: address, seed: seed, rootKey: root.toBase58(), phrase: phrase, child: child.toBase58() };
    };
    return GenerateKey;
}());
exports.GenerateKey = GenerateKey;
//# sourceMappingURL=GenerateKey.js.map