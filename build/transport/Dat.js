"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserLib = require("../base/User");
var DatNode = require("dat-node");
var path = require("path");
var fs = require("fs");
var ram = require("random-access-memory");
var mirror = require("mirror-folder");
var Envelope_1 = require("../transport/Envelope");
var User_1 = require("../base/User");
var Dat = /** @class */ (function () {
    function Dat(_UserType) {
        this.dat = [];
        if (_UserType) {
            this.user = UserLib.As(_UserType);
        }
        else {
            this.user = new UserLib.User(User_1.UserType.Generic);
        }
    }
    Dat.prototype.Share = function (sharePath, callback, ignores) {
        this.src = path.join(__dirname, sharePath);
        var src = this.src;
        var logs = [];
        var parent = this;
        DatNode(this.src, { temp: true }, function (err, dat) {
            if (err)
                throw err;
            parent.dat.push(dat);
            parent.network = dat.joinNetwork();
            parent.network.once('connection', function () {
                logs.push("Connected");
            });
            var progress = dat.importFiles(src, {
                ignore: ignores || []
            }, function (err) {
                if (err)
                    throw err;
                logs.push("Done importing");
                logs.push("Archive size: " + dat.archive.content.byteLength);
                return callback(dat.key.toString('hex'), logs);
            });
            progress.on('put', function (_src, dest) {
                logs.push("Added: " + dest.name);
            });
            logs.push(dat.key.toString('hex'));
        });
    };
    Dat.prototype.Download = function (destinationPath, key, callback) {
        this.destination = path.join(__dirname, destinationPath);
        var dest = this.destination;
        var logs = [];
        var parent = this;
        var envelope = new Envelope_1.Envelope();
        if (!fs.existsSync(dest))
            fs.mkdirSync(dest);
        return DatNode(ram, { key: key, sparse: true }, function (err, dat) {
            if (err)
                throw err;
            parent.dat.push(dat);
            parent.network = dat.joinNetwork(function (err) {
                if (err)
                    throw err;
                if (!dat.network.connected || !dat.network.connecting) {
                    logs.push('No users currently online for that key.');
                    callback(logs);
                    return envelope;
                }
            });
            parent.network.once('connection', function () {
                logs.push("Connected");
            });
            dat.archive.metadata.update(download);
            function download() {
                var progress = mirror({ fs: dat.archive, name: '/' }, dest, function (err) {
                    if (err)
                        throw err;
                    logs.push('Done');
                    callback(logs);
                    return envelope;
                });
                progress.on('put', function (src) {
                    logs.push('Downloading', src.name);
                });
            }
        });
    };
    return Dat;
}());
exports.Dat = Dat;
