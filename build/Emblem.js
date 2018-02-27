"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Envelope_1 = require("./transport/Envelope");
var Emblem = /** @class */ (function () {
    function Emblem() {
        this.datNodes = [];
        this.claimed = false;
    }
    Emblem.prototype.AddDatNode = function (dat) {
        var envelope = new Envelope_1.Envelope();
        if (this.findDatOfType(dat.getID())) {
            envelope.AddError("Dat of this type already exists");
        }
        else {
            this.datNodes.push(dat);
            envelope.AddValue("Sucessfully added dat");
        }
        envelope.AddValue("Sucessfully added dat");
        return envelope;
    };
    Emblem.prototype.findDatOfType = function (type) {
        var found = this.datNodes.filter(function (d) { return d.getID() === type; });
        return found.length > 0 ? found[0] : null;
    };
    Emblem.prototype.HasRequiredDats = function () {
        return !!this.findDatOfType('client') && !!this.findDatOfType('server');
    };
    return Emblem;
}());
exports.Emblem = Emblem;
//# sourceMappingURL=Emblem.js.map