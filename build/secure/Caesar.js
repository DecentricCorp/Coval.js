"use strict";
exports.__esModule = true;
var CaesarLib = require("caesar");
var Caesar = /** @class */ (function () {
    function Caesar() {
    }
    Caesar.prototype.CreatePrivate = function () {
        return CaesarLib.key.createPrivate();
    };
    Caesar.prototype.CreateRandom = function () {
        return CaesarLib.key.createRandom();
    };
    Caesar.prototype.CreateKtsSigner = function (threshold, key) {
        if (key) {
            return new CaesarLib.kts.Signer(threshold, key);
        }
        return new CaesarLib.kts.Signer(threshold);
    };
    Caesar.prototype.CreateKtsVerifier = function (pubKey) {
        return new CaesarLib.kts.Verifier(pubKey);
    };
    Caesar.prototype.CreateXtsEncrypter = function (key) {
        return new XtsEncryptor(key);
    };
    Caesar.prototype.CreateXtsDecrypter = function (key) {
        return new XtsDecrypter(key);
    };
    return Caesar;
}());
exports.Caesar = Caesar;
var XtsEncryptor = /** @class */ (function () {
    function XtsEncryptor(key) {
        this.encrypter = new CaesarLib.message.XTSEncrypter(key);
    }
    XtsEncryptor.prototype.write = function (buffer, cb) {
        this.encrypter.write(buffer);
        this.encrypter.on('data', function (chunk) {
            cb(chunk);
        });
    };
    return XtsEncryptor;
}());
exports.XtsEncryptor = XtsEncryptor;
var XtsDecrypter = /** @class */ (function () {
    function XtsDecrypter(key) {
        this.decryptedChunks = '';
        this.registeredActivity = false;
        this.decrypter = new CaesarLib.message.XTSDecrypter(key);
    }
    XtsDecrypter.prototype.Activity = function (msgBufferLength, cb) {
        var _this = this;
        this.decrypter.on('data', function (chunk) {
            if (_this.decryptedChunks.length + 32 > msgBufferLength) {
                var extra = _this.decryptedChunks.length + 32 - msgBufferLength;
                var sliceAt = 32 - extra;
                chunk = chunk.slice(0, sliceAt);
                _this.decryptedChunks += chunk;
                return cb(_this.decryptedChunks);
            }
            _this.decryptedChunks += chunk;
        });
    };
    XtsDecrypter.prototype.write = function (buffer, msgBufferLength, cb) {
        if (!this.registeredActivity) {
            this.Activity(msgBufferLength, cb);
            this.registeredActivity = true;
        }
        this.decrypter.write(buffer);
    };
    return XtsDecrypter;
}());
exports.XtsDecrypter = XtsDecrypter;
