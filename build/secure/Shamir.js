"use strict";
exports.__esModule = true;
var secrets = require("secrets.js-grempe");
var Envelope_1 = require("../transport/Envelope");
var Shamir;
(function (Shamir) {
    var Key = /** @class */ (function () {
        function Key() {
        }
        Key.prototype.GetKey = function () {
            var envelope = new Envelope_1.Envelope();
            if (!this.key) {
                this.key = secrets.random(512);
            }
            else {
                envelope.AddError("Key accessed twice!");
            }
            envelope.AddValue(this.key);
            return envelope;
        };
        Key.prototype.CreateShares = function (count, threshold) {
            this.GetKey();
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
