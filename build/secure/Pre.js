"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
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
        var options = new PyShell_1.PyShellOptions(PyShell_1.Mode.Text, '/usr/local/bin/python3');
        var pyshell = new PyShell_1.PyShell(path.combine(__dirname, '..', '..', '/build/python/') + this.script, options);
        pyshell.Run('build/python/' + this.script, function (err, msg) {
            return callback(msg, err);
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
//# sourceMappingURL=Pre.js.map