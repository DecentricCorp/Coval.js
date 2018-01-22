"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Envelope_1 = require("../transport/Envelope");
var Protected = /** @class */ (function () {
    function Protected(value) {
        var privateValue = value;
        this.Value = function () {
            var envelope = new Envelope_1.Envelope();
            envelope.AddValue(privateValue);
            if (!privateValue) {
                envelope.AddError("Self destructed!");
            }
            privateValue = null;
            return envelope;
        };
    }
    return Protected;
}());
exports.Protected = Protected;
