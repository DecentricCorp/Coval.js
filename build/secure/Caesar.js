"use strict";
exports.__esModule = true;
var CaesarLib = require("caesar");
var Caesar = /** @class */ (function () {
    function Caesar() {
    }
    Caesar.prototype.CreatePrivate = function () {
        return CaesarLib.key.createPrivate();
    };
    return Caesar;
}());
exports.Caesar = Caesar;
