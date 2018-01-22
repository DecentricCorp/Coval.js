"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//export module CovalType {
var Error = /** @class */ (function () {
    /**
     * Creates an instance of Error.
     * @param {string} message
     * @memberof Error
     */
    function Error(message) {
        this.message = message;
        this.message = message;
    }
    return Error;
}());
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
        this._internalAddError(new Error(error));
    };
    return Errors;
}());
exports.Errors = Errors;
