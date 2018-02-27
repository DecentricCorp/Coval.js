"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Envelope_1 = require("./transport/Envelope");
var Emblem = /** @class */ (function () {
    function Emblem() {
        this.datNodes = {};
        this.claimed = false;
    }
    Emblem.prototype.AddDatNode = function (key, dat) {
        var envelope = new Envelope_1.Envelope();
        var found = this.datNodes[key];
        if (found) {
            envelope.AddError("Dat of this type already exists");
        }
        else {
            this.datNodes[key] = dat;
            envelope.AddValue("Sucessfully added dat");
        }
        envelope.AddValue("Sucessfully added dat");
        return envelope;
    };
    Emblem.prototype.HasRequiredDats = function () {
        return Object.keys(this.datNodes).length > 1;
    };
    return Emblem;
}());
exports.Emblem = Emblem;
//# sourceMappingURL=Emblem.js.map