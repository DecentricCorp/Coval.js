"use strict";
exports.__esModule = true;
var _Envelope = require("./Envelope");
var Protected = /** @class */ (function () {
    function Protected(value) {
        var privateValue = value;
        this.Value = function () {
            var envelope = new _Envelope.Envelope();
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
