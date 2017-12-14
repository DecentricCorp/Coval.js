"use strict";
exports.__esModule = true;
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.prototype.HexEncode = function (input) {
        var hex, i;
        var result = "";
        for (i = 0; i < input.length; i++) {
            hex = input.charCodeAt(i).toString(16);
            result += ("000" + hex).slice(-4);
        }
        return result;
    };
    Utils.prototype.HexDecode = function (j) {
        //var j
        var hexes = j.match(/.{1,4}/g) || [];
        var back = "";
        for (j = 0; j < hexes.length; j++) {
            back += String.fromCharCode(parseInt(hexes[j], 16));
        }
        return back;
    };
    return Utils;
}());
exports.Utils = Utils;
