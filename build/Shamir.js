"use strict";
exports.__esModule = true;
var secrets = require("secrets.js-grempe");
var Envelope_1 = require("./Envelope");
var Shamir;
(function (Shamir) {
    var Key = /** @class */ (function () {
        function Key() {
            this.envelope = new Envelope_1.Envelope();
        }
        Key.prototype.GetKey = function () {
            if (!this.key) {
                this.key = secrets.random(512);
            }
            else {
                this.envelope.AddError("Key accessed twice!");
            }
            this.envelope.AddValue(this.key);
            return this.envelope;
        };
        return Key;
    }());
    Shamir.Key = Key;
})(Shamir = exports.Shamir || (exports.Shamir = {}));
