"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Protected_1 = require("./secure/Protected");
var Mnemonic_1 = require("./secure/Mnemonic");
var Shamir_1 = require("./secure/Shamir");
var Diffie_1 = require("./secure/Diffie");
var Envelope_1 = require("./transport/Envelope");
var Dat_1 = require("./transport/Dat");
var Multichain_1 = require("./transport/Multichain");
var Unloq_1 = require("./partner/Unloq");
var Changely_1 = require("./partner/Changely");
var Shapeshift_1 = require("./partner/Shapeshift");
var Vocal_1 = require("./Vocal");
var Emblem_1 = require("./Emblem");
var Caesar_1 = require("./secure/Caesar");
var HDKey_1 = require("./secure/HDKey");
var Pre_1 = require("./secure/Pre");
var Lightrail_1 = require("./partner/Lightrail");
var Agent_1 = require("./Agent");
var Error_1 = require("./base/Error");
var Log_1 = require("./base/Log");
var Msgs_1 = require("./base/Msgs");
var PyShell_1 = require("./base/PyShell");
var User = require("./base/User");
/**
 * Coval main export
 *
 * @export
 * @class Coval
 */
var Coval = /** @class */ (function () {
    function Coval() {
        this.Secure = new Secures();
        this.Partner = new Partners();
        this.Transport = new Transports();
        this.Vocal = Vocal_1.Vocal;
        this.Emblem = Emblem_1.Emblem;
        this.Agent = Agent_1.Agent;
        this.Error = Error_1.BaseError;
        this.Log = Log_1.Log;
        this.Msgs = Msgs_1.Msgs;
        this.PyShell = PyShell_1.PyShell;
        this.User = User;
    }
    return Coval;
}());
exports.Coval = Coval;
/**
 * Coval Secure Class
 *
 * @export
 * @class Secure
 */
var Secures = /** @class */ (function () {
    function Secures() {
        this.Shamir = Shamir_1.Shamir;
        this.Protected = Protected_1.Protected;
        this.Diffie = Diffie_1.Diffie;
        this.Mnemonic = Mnemonic_1.Mnemonic;
        this.Caesar = Caesar_1.Caesar;
        this.HDKey = HDKey_1.HDKey;
        this.Pre = Pre_1.Pre;
    }
    return Secures;
}());
exports.Secures = Secures;
/**
 * Partners of Coval
 *
 * @export
 * @class Partner
 */
var Partners = /** @class */ (function () {
    function Partners() {
        this.Unloq = Unloq_1.Unloq;
        this.Shapeshift = Shapeshift_1.Shapeshift;
        this.Changely = Changely_1.Changely;
        this.Lightrail = Lightrail_1.Lightrail;
    }
    return Partners;
}());
exports.Partners = Partners;
/**
 * Coval Transport Class
 *
 * @export
 * @class Transport
 */
var Transports = /** @class */ (function () {
    function Transports() {
        this.Envelope = Envelope_1.Envelope;
        this.Dat = Dat_1.Dat;
        this.Multichain = Multichain_1.Multichain;
    }
    return Transports;
}());
exports.Transports = Transports;
//# sourceMappingURL=Coval.js.map