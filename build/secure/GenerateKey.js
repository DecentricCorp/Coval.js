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
    GenerateKey.prototype.CalculateBip32FromSeed = function (seed, coin) {
        var root = bip32.fromSeed(Buffer.from(seed, 'hex'), coininfo_1.supportedCoins[coin].toBitcoinJS());
        //var address = bitcoin.payments.p2pkh({ pubkey: root.publicKey, network: supportedCoins[coin].toBitcoinJS()}).address
        //return {pk: root, pubkey: root.publicKey, address: address}
        return root;
    };
    GenerateKey.prototype.CalculateBip32FromPhrase = function (phrase, coin) {
        var mnemonic = new Mnemonic.Mnemonic();
        var seed = mnemonic.ToSeedHex(phrase);
        var network = coininfo_1.supportedCoins[coin].toBitcoinJS();
        var root = bip32.fromSeed(Buffer.from(seed, 'hex'), network);
        return root;
        //var bip44 = this.DeriveBip44Addresses(root, coin)
        //console.log(network)
        //var address = bitcoin.payments.p2wpkh({ pubkey: child.publicKey, network: supportedCoins[coin].toBitcoinJS()}).address
        //return {root: root, pubkey: root.publicKey, address: bip44.address, seed: seed, rootKey: root.toBase58(), phrase: phrase, child: bip44.key.toBase58()}
    };
    GenerateKey.prototype.DeriveBip44 = function (root, coin, count, cb) {
        var network = coininfo_1.supportedCoins[coin].toBitcoinJS();
        var coinId = network.versions.bip44;
        var path = "m/44'/" + coinId + "'/0'/0";
        var child = root.derivePath(path);
        var addresses = [];
        getAddressAtIndex(0);
        function getAddressAtIndex(index) {
            var key = child.derive(index);
            var address = bitcoin.payments.p2pkh({ pubkey: key.publicKey, network: network }).address;
            addresses.push(address);
            if (index === count - 1) {
                return cb(addresses);
            }
            else {
                return getAddressAtIndex(index + 1);
            }
        }
    };
    GenerateKey.prototype.GetAllAddresses = function (seed, cb) {
        var root_class = this;
        var coins = Object.keys(coininfo_1.supportedCoins);
        var addresses = {};
        getAddress(0);
        function getAddress(index) {
            var coin = coins[index];
            var root = root_class.CalculateBip32FromSeed(seed, coin);
            root_class.DeriveBip44(root, coin, 1, function (address) {
                addresses[coin] = { address: address[0], unit: coininfo_1.supportedCoins[coin].unit };
                return handleReturn();
            });
            function handleReturn() {
                if (index === coins.length - 1) {
                    return cb(addresses);
                }
                else {
                    return getAddress(index + 1);
                }
            }
        }
    };
    return GenerateKey;
}());
exports.GenerateKey = GenerateKey;
//# sourceMappingURL=GenerateKey.js.map