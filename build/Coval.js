"use strict";
exports.__esModule = true;
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
/**
 * Coval main export
 *
 * @export
 * @class Coval
 */
var Coval = /** @class */ (function () {
    function Coval() {
        this.Secure = Secure;
        this.Partner = Partner;
        this.Transport = Transport;
        this.Vocal = Vocal_1.Vocal;
        this.Emblem = Emblem_1.Emblem;
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
var Secure = /** @class */ (function () {
    function Secure() {
        this.Shamir = Shamir_1.Shamir;
        this.Protected = Protected_1.Protected;
        this.Diffie = Diffie_1.Diffie;
        this.Mnemonic = Mnemonic_1.Mnemonic;
        this.Caesar = Caesar_1.Caesar;
        this.HDKey = HDKey_1.HDKey;
        this.Pre = Pre_1.Pre;
    }
    return Secure;
}());
/**
 * Partners of Coval
 *
 * @export
 * @class Partner
 */
var Partner = /** @class */ (function () {
    function Partner() {
        this.Unloq = Unloq_1.Unloq;
        this.Shapeshift = Shapeshift_1.Shapeshift;
        this.Changely = Changely_1.Changely;
    }
    return Partner;
}());
exports.Partner = Partner;
/**
 * Coval Transport Class
 *
 * @export
 * @class Transport
 */
var Transport = /** @class */ (function () {
    function Transport() {
        this.Envelope = Envelope_1.Envelope;
        this.Dat = Dat_1.Dat;
        this.Multichain = Multichain_1.Multichain;
    }
    return Transport;
}());
exports.Transport = Transport;
