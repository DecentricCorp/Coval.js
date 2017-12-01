"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Error_1 = require("../build/Error");
var Errors = Error_1.CovalType.Errors;
/**
 *
 *
 * @export
 * @class Envelope
 * @extends {Errors}
 */
var Envelope = /** @class */ (function (_super) {
    __extends(Envelope, _super);
    function Envelope() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Envelope.prototype.AddValue = function (value) {
        Envelope.value = value;
    };
    Envelope.prototype.GetValue = function () {
        return Envelope.value;
    };
    Envelope.prototype.toString = function () {
        return {
            value: Envelope.value,
            errors: this.Errors()
        };
    };
    return Envelope;
}(Errors));
exports.Envelope = Envelope;
