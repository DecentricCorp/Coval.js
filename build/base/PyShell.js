"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PythonShell = require("python-shell");
var PyShell = /** @class */ (function () {
    function PyShell(script, options) {
        this.script = script;
        this.options = options;
        if (script) {
            this.Interactive = new PythonShell(script, options || {});
        }
    }
    PyShell.prototype.Run = function (script, callback) {
        PythonShell.run(script, this.options || {}, function (err, results) {
            return callback(err, results);
        });
    };
    PyShell.prototype.Send = function (input, callback) {
        this.Interactive.send(input);
        this.Interactive.on('message', function (message) {
            return callback(message);
        });
    };
    PyShell.prototype.End = function (callback) {
        this.Interactive.end(function (err) {
            return callback(err);
        });
    };
    return PyShell;
}());
exports.PyShell = PyShell;
var PyShellOptions = /** @class */ (function () {
    function PyShellOptions(mode, pythonPath, pythonOptions, scriptPath, args) {
        this.mode = mode;
        this.pythonPath = pythonPath;
        this.pythonOptions = pythonOptions;
        this.scriptPath = scriptPath;
        this.args = args;
    }
    return PyShellOptions;
}());
exports.PyShellOptions = PyShellOptions;
var Mode;
(function (Mode) {
    Mode["Text"] = "text";
    Mode["Json"] = "json";
    Mode["Binary"] = "binary";
})(Mode = exports.Mode || (exports.Mode = {}));
