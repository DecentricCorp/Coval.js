"use strict";
exports.__esModule = true;
var _Shamir = require("./Shamir");
var _Envelope = require("./Envelope");
var _Protected = require("./Protected");
/**
 * Coval Secure Class
 *
 * @export
 * @class Secure
 */
var Secure = /** @class */ (function () {
    function Secure() {
        this.Shamir = _Shamir.Shamir;
        this.Protected = _Protected.Protected;
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
        this.Envelope = _Envelope.Envelope;
    }
    return Transport;
}());
exports.Transport = Transport;
