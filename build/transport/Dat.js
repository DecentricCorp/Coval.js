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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var Dat = require("dat-node");
var ram = require("random-access-memory");
var DatManager = /** @class */ (function (_super) {
    __extends(DatManager, _super);
    function DatManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._datnodes = {};
        return _this;
    }
    DatManager.prototype.createOutgoingArchive = function (archivePath, callback) {
        this.createDatNode(archivePath, {}, callback);
    };
    DatManager.prototype.createTransientOutgoingArchive = function (archivePath, callback) {
        this.createDatNode(archivePath, { temp: true }, callback);
    };
    DatManager.prototype.createIncomingArchive = function (key, archivePath, callback) {
        this.createDatNode(archivePath, { key: key }, callback);
    };
    DatManager.prototype.createTransientIncomingArchive = function (key, callback) {
        this.createDatNode(ram, { key: key, temp: true }, callback);
    };
    DatManager.prototype.createDatNode = function (archive, options, callback) {
        if (callback) {
            this.once('create', callback);
        }
        var me = this;
        Dat(archive, options, function (err, dat) {
            if (err) {
                me.emit('create', me, undefined, err);
            }
            else {
                var datnode = new DatNode(dat);
                me._datnodes[datnode.getKey()] = datnode;
                // datnode.initStats();
                me.emit('create', me, datnode);
            }
        });
    };
    DatManager.prototype.getDatNode = function (key, callback) {
        return this._datnodes[key];
    };
    DatManager.prototype.getDatNodes = function () {
        return __assign({}, (this._datnodes));
    };
    DatManager.prototype.disposeDatNode = function (key, callback) {
        if (callback) {
            this.once('dispose', callback);
        }
        var datnode = this.getDatNode(key);
        if (datnode) {
            delete this._datnodes[key];
            var me_1 = this;
            datnode.close(function () {
                me_1.emit('dispose', me_1, datnode);
            });
        }
        else {
            this.emit('dispose', this, null);
        }
    };
    DatManager.prototype.shutdown = function () {
        var me = this;
        Object.keys(this._datnodes).forEach(function (key) {
            me.disposeDatNode(key);
        });
    };
    return DatManager;
}(events_1.EventEmitter));
exports.DatManager = DatManager;
var DatNode = /** @class */ (function (_super) {
    __extends(DatNode, _super);
    function DatNode(dat) {
        var _this = _super.call(this) || this;
        _this._dat = dat;
        _this._key = dat.key.toString('hex');
        _this._stats = _this._dat.trackStats();
        return _this;
    }
    DatNode.prototype.getKey = function () {
        return this._key;
    };
    DatNode.prototype.importFiles = function (callback) {
        if (callback) {
            this.once('import', callback);
        }
        var me = this;
        this._dat.importFiles(function (err) {
            me.emit('import', me, err);
        });
    };
    DatNode.prototype.close = function (callback) {
        if (callback) {
            this.once('close', callback);
        }
        var me = this;
        this._dat.close(function () {
            me.emit('close', me);
        });
    };
    return DatNode;
}(events_1.EventEmitter));
exports.DatNode = DatNode;
//# sourceMappingURL=Dat.js.map