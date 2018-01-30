"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var secrets = require("secrets.js-grempe");
var Envelope_1 = require("../transport/Envelope");
var Shamir;
(function (Shamir) {
    var Key = /** @class */ (function () {
        function Key() {
        }
        Key.prototype.GetKey = function (length) {
            var envelope = new Envelope_1.Envelope();
            if (!this.key) {
                this.key = secrets.random(length || 512);
            }
            else {
                envelope.AddError("Key accessed twice!");
            }
            envelope.AddValue(this.key);
            return envelope;
        };
        Key.prototype.CreateShares = function (count, threshold, length) {
            if (!this.key) {
                this.GetKey(length || 512);
            }
            var shares = secrets.share(this.key, count, threshold);
            var envelope = new Envelope_1.Envelope();
            envelope.AddValue(shares);
            return envelope;
        };
        Key.prototype.CombineShares = function (shares) {
            var combined = secrets.combine(shares);
            var envelope = new Envelope_1.Envelope();
            envelope.AddValue(combined);
            return envelope;
        };
        return Key;
    }());
    Shamir.Key = Key;
})(Shamir = exports.Shamir || (exports.Shamir = {}));
