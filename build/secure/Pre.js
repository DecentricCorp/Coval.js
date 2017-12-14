"use strict";
exports.__esModule = true;
var PyShell_1 = require("../base/PyShell");
var Pre = /** @class */ (function () {
    function Pre() {
    }
    Pre.prototype.Execute = function (callback) {
        var options = new PyShell_1.PyShellOptions(PyShell_1.Mode.Text, 'build/python/myenv/bin/python');
        var pyshell = new PyShell_1.PyShell('build/python/pre.py', options);
        pyshell.Run('build/python/pre.py', function (err, msg) {
            return callback(msg);
        });
    };
    return Pre;
}());
exports.Pre = Pre;
