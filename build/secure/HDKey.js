"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bitcore = require("bitcore");
var CryptoJS = require("crypto-js");
var _Utils = require("../Utils");
var Envelope_1 = require("../transport/Envelope");
var APIKey = "3031323334353637383931323334353637383930";
var Utils = new _Utils.Utils();
var HDKey = /** @class */ (function () {
    function HDKey() {
    }
    HDKey.prototype.CreateNamespacedHDKey = function (ns, sha256Password, plainTextPassword, walletPath) {
        var envelope = new Envelope_1.Envelope();
        var seed, nonce, passHex, pass;
        var path = EncodePath(walletPath);
        //console.log("--=-=-=-=-=-=-=-==-=", path, walletPath, ns, sha256Password, plainTextPassword)
        ns = Utils.HexEncode(ns);
        pass = EncodePass(sha256Password, plainTextPassword);
        //console.log("--=-=-=-=-=-=-=-==-= pass", pass)
        nonce = bitcore.crypto.Hash.sha256(bitcore.util.buffer.hexToBuffer(ns + APIKey)).toString('hex');
        //console.log("--=-=-=-=-=-=-=-==-= nonce", nonce)
        seed = bitcore.crypto.Hash.sha256(bitcore.util.buffer.hexToBuffer(ns + pass + nonce)).toString('hex');
        //console.log("--=-=-=-=-=-=-=-==-= seed", seed)
        return GeneratePayloadFromSeed(seed, path, function (address, pk) {
            var encrypted = CryptoJS.AES.encrypt(seed, pass).toString();
            envelope.AddValue({ encrypted: encrypted, address: address });
            return envelope;
        });
    };
    HDKey.prototype.DecodeKey = function (encrypted, sha256Password, plainTextPassword, walletPath) {
        var path = EncodePath(walletPath);
        var pass = EncodePass(sha256Password, plainTextPassword);
        var seed = CryptoJS.AES.decrypt(encrypted, pass).toString(CryptoJS.enc.Utf8);
        //return {seed: seed, pass: pass}
        try {
            return GeneratePayloadFromSeed(seed, path, function (address, pk) {
                return { seed: seed, key: pk, address: address };
            });
        }
        catch (err) {
            return { error: err };
        }
        /* Debug */ //return {encrypted:encrypted, sha256Password:sha256Password, plainTextPassword:plainTextPassword, walletPath:walletPath, path:path, pass:pass, seed:seed }
    };
    HDKey.prototype.StandardHDKey = function (walletPath, cb) {
        var pk = new bitcore.HDPrivateKey(bitcore.Networks.mainnet);
        var d = pk.derive("m/0'/0/" + walletPath, false);
        var address = d.privateKey.toAddress().toString();
        return cb(address, pk);
    };
    HDKey.prototype.MakeNamespace = function (req) {
        var teamId, userId, service, ns;
        teamId = req.body.originalRequest.data.team_id;
        userId = req.body.originalRequest.data.event.user;
        service = req.body.originalRequest.source;
        ns = service + ":" + teamId + ":" + userId;
        return ns;
    };
    /* public MakeNamespaceOverride(userId: string, req: any) {
        var teamId, service, ns
            teamId = req.body.originalRequest.data.team_id
            service = req.body.originalRequest.source
            ns = service+":"+teamId+":"+userId
            console.log('--------- Namespace', ns)
        return ns
    } */
    HDKey.prototype.MakeWalletFromNs = function (ns) {
        return this.CreateNamespacedHDKey(ns);
    };
    HDKey.prototype.CreateKeysFromEncrypted = function (encrypted) {
        var fromKey = this.DecodeKey(encrypted);
        return this.DeriveKeyWif(fromKey, 0);
    };
    HDKey.prototype.DeriveKeyWif = function (fromKey, index) {
        if (!index) {
            index = 0;
        }
        var hdPrivateKey = new bitcore.HDPrivateKey(fromKey.key, bitcore.Networks.mainnet);
        var derived = hdPrivateKey.derive("m/0'/0/0");
        var wif = derived.privateKey.toWIF();
        return { derived: derived, wif: wif, pk: fromKey.key };
    };
    return HDKey;
}());
exports.HDKey = HDKey;
function EncodePath(walletPath) {
    var path = walletPath || 0;
    return path;
}
function EncodePass(sha256Password, plainTextPassword) {
    var pass;
    if (sha256Password) {
        pass = sha256Password;
    }
    else if (plainTextPassword) {
        var passHex = Utils.HexEncode(plainTextPassword);
        //console.log('-=-=-=-=-=-= plain text pw', plainTextPassword, passHex)
        pass = bitcore.crypto.Hash.sha256(bitcore.util.buffer.hexToBuffer(passHex)).toString('hex');
    }
    else {
        //console.log('=-=-=-=- NO PASSWORD')
        pass = bitcore.crypto.Hash.sha256(bitcore.util.buffer.hexToBuffer(APIKey)).toString('hex');
    }
    return pass;
}
function GeneratePayloadFromSeed(seed, index, cb) {
    var pk = bitcore.HDPrivateKey.fromSeed(seed, bitcore.Networks.mainnet);
    var d = pk.derive("m/0'/0/" + index, false);
    var address = d.privateKey.toAddress().toString();
    return cb(address, pk);
}
