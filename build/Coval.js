"use strict";
exports.__esModule = true;
var Protected_1 = require("./secure/Protected");
var Mnemonic_1 = require("./secure/Mnemonic");
var Shamir_1 = require("./secure/Shamir");
var Diffie_1 = require("./secure/Diffie");
var Envelope_1 = require("./transport/Envelope");
var Dat_1 = require("./transport/Dat");
var Multichain_1 = require("./transport/Multichain");
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
    }
    return Secure;
}());
exports.Secure = Secure;
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
