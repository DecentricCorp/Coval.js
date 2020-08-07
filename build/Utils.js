"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    Utils.prototype.HexToAscii = function (hexString) {
        var strOut = '';
        for (var x = 0; x < hexString.length; x += 2) {
            strOut += String.fromCharCode(parseInt(hexString.substr(x, 2), 16));
        }
        return strOut;
    };
    Utils.prototype.toHexString = function (byteArray) {
        return Array.prototype.map.call(byteArray, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map