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
Object.defineProperty(exports, "__esModule", { value: true });
require("../base/Log");
require("../base/Msgs");
var Msgs_1 = require("../base/Msgs");
var Envelope = /** @class */ (function (_super) {
    __extends(Envelope, _super);
    function Envelope() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Envelope.prototype.AddValue = function (_value) {
        this.value = _value;
    };
    Envelope.prototype.GetValue = function () {
        return this.value;
    };
    Envelope.prototype.toString = function () {
        return {
            value: this.value,
            errors: this.Errors(),
            logs: this.EnvLogs().env_logs
        };
    };
    return Envelope;
}(Msgs_1.Msgs));
exports.Envelope = Envelope;
