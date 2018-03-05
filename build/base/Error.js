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
//export module CovalType {
var BaseError = /** @class */ (function () {
    /**
     * Creates an instance of Error.
     * @param {string} message
     * @memberof Error
     */
    function BaseError(message) {
        this.message = message;
        this.message = message;
    }
    return BaseError;
}());
exports.BaseError = BaseError;
var NotConnectedError = /** @class */ (function (_super) {
    __extends(NotConnectedError, _super);
    function NotConnectedError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'NotConnectedError';
        return _this;
    }
    return NotConnectedError;
}(Error));
exports.NotConnectedError = NotConnectedError;
var Errors = /** @class */ (function () {
    function Errors() {
        this.errors = [];
    }
    Errors.prototype.Errors = function () {
        return this.errors;
    };
    Errors.prototype.HasErrors = function () {
        return this.errors.length > 0;
    };
    /**
     * Internal because Error interface is
     * @param error
     */
    Errors.prototype._internalAddError = function (error) {
        this.errors.push(error);
    };
    Errors.prototype.AddError = function (error) {
        this._internalAddError(new BaseError(error));
    };
    return Errors;
}());
exports.Errors = Errors;
//# sourceMappingURL=Error.js.map