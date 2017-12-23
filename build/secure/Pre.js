"use strict";
exports.__esModule = true;
var PyShell_1 = require("../base/PyShell");
var Pre = /** @class */ (function () {
    function Pre(script) {
        if (script) {
            this.script = script;
        }
        else {
            this.script = 'pre.py';
        }
    }
    Pre.prototype.Execute = function (callback) {
        var options = new PyShell_1.PyShellOptions(PyShell_1.Mode.Text, 'build/python/myenv/bin/python');
        var pyshell = new PyShell_1.PyShell('build/python/' + this.script, options);
        pyshell.Run('build/python/' + this.script, function (err, msg) {
            return callback(msg);
        });
    };
    Pre.prototype.GenKey = function (callback) {
        this.Execute(function (msg) {
            //console.log('------- unparsed msg', msg[0], JSON.stringify(msg[0]))
            return callback(JSON.parse(JSON.stringify(msg[0])));
        });
    };
    return Pre;
}());
exports.Pre = Pre;
