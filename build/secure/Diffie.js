"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var Diffie = /** @class */ (function () {
    function Diffie(strength, prime, generator, key) {
        if (generator && prime) {
            this.dh = crypto.createDiffieHellman(prime, generator);
        }
        else {
            this.dh = crypto.createDiffieHellman(strength || 2048);
        }
        if (key) {
            this.dh.setPrivateKey(key);
        }
        this.keys = this.dh.generateKeys();
    }
    Diffie.prototype.GetPubKey = function () {
        return this.dh.getPublicKey();
    };
    Diffie.prototype.GetPrime = function () {
        return this.dh.getPrime();
    };
    Diffie.prototype.GetGenerator = function () {
        return this.dh.getGenerator();
    };
    Diffie.prototype.GetPrivateKey = function () {
        return this.dh.getPrivateKey();
    };
    Diffie.prototype.GetSharedSecret = function (pubkey) {
        return this.dh.computeSecret(pubkey);
    };
    Diffie.prototype.Serialize = function () {
        return {
            pubkey: this.dh.getPublicKey(),
            privkey: this.dh.getPrivateKey(),
            prime: this.dh.getPrime(),
            generator: this.dh.getGenerator()
        };
    };
    return Diffie;
}());
exports.Diffie = Diffie;
