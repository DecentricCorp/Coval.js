"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mneumonic = require("bip39");
var bip39Shamir = require("bip39shamir-web");
var Mnemonic = /** @class */ (function () {
    function Mnemonic(seed) {
        if (seed) {
            this.seed = Buffer.from(seed, 'hex');
        }
    }
    Mnemonic.prototype.Generate = function (strength) {
        if (this.seed) {
            return mneumonic.entropyToMnemonic(this.seed);
        }
        else {
            return mneumonic.generateMnemonic(strength || 256);
        }
    };
    Mnemonic.prototype.ToSeedHex = function (phrase) {
        return mneumonic.mnemonicToSeedHex(phrase);
    };
    Mnemonic.prototype.ToEntropy = function (phrase) {
        if (!phrase) {
            return "Missing Phrase";
        }
        else {
            return mneumonic.mnemonicToEntropy(phrase);
        }
    };
    Mnemonic.prototype.Split = function (quantity, threshold, phrase) {
        var shares = bip39Shamir.shares(phrase || this.Generate(128), quantity || 3, threshold || 2);
        return shares;
    };
    Mnemonic.prototype.Combine = function (shares) {
        return bip39Shamir.combine(shares);
    };
    return Mnemonic;
}());
exports.Mnemonic = Mnemonic;
//# sourceMappingURL=Mnemonic.js.map