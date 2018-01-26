"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Envelope_1 = require("./transport/Envelope");
var Emblem = /** @class */ (function () {
    function Emblem() {
        this.dats = [];
        this.claimed = false;
    }
    /**
     * @deprecated
     */
    Emblem.prototype.AddDat = function (dat) {
        var envelope = new Envelope_1.Envelope();
        var found = this.dats.filter(function (d) { return d.user.type === dat.user.type; });
        if (found.length > 0) {
            envelope.AddError("Dat of this type already exists");
        }
        else {
            this.dats.push(dat);
            envelope.AddValue("Sucessfully added dat");
        }
        return envelope;
    };
    /**
     * @deprecated
     */
    Emblem.prototype.HasRequiredDats = function () {
        var serverDat = this.dats.filter(function (d) { return d.user.type === 'server'; });
        var clientDat = this.dats.filter(function (d) { return d.user.type === 'client'; });
        return serverDat.length > 0 && clientDat.length > 0;
    };
    return Emblem;
}());
exports.Emblem = Emblem;
