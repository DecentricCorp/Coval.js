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
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var Dat = require("dat-node");
var DatManager = /** @class */ (function () {
    function DatManager() {
        this._datnodes = {};
    }
    //     Share(sharePath: string, callback, ignores?: string[]) {
    //         this.ignores = ignores || [];
    //         this.src = sharePath;
    //         this.createNode(function(datnode, me:Dat) {
    //             console.log("Created node callback. Joining network.")
    //             me.joinNetwork(datnode, function(datnode, me:Dat) {
    //                 console.log("Join network complete")
    //             });
    //             me.importFiles(datnode, callback);
    //         });
    //     }
    //     Download(destinationPath: string, key: any, callback) {
    //         this.src =  = destinationPath
    //         if (!fs.existsSync(dest)) fs.mkdirSync(dest)
    //         this.createNode()
    //         return DatNode(ram, { key: key, sparse: true }, function (err, dat) {
    //             if (err) throw err
    //             parent.dat.push(dat)
    //             parent.network = dat.joinNetwork(function(err){
    //                 if (err) throw err
    //                 if (!dat.network.connected || !dat.network.connecting) {
    //                     logs.push('No users currently online for that key.')
    //                     callback(logs)
    //                 }
    //             })
    //             parent.network.once('connection', function () {
    //                 logs.push("Connected")
    //             })
    //             dat.archive.metadata.update(download)
    //             function download() {
    //                 var progress = mirror({ fs: dat.archive, name: '/' }, dest, function (err) {
    //                     if (err) throw err
    //                     logs.push('Done')
    //                     callback(logs)
    //                     return envelope
    //                 })
    //                 progress.on('put', function (src) {
    //                     logs.push('Downloading', src.name)
    //                 })
    //             }
    //         })
    //     }
    // createOutgoingArchive(id:string, archivePath:string): Promise<DatNode> {
    //     return this.createDatNode(id, archivePath, {watch:true})
    // }
    // createTransientOutgoingArchive(id:string, archivePath:string): Promise<DatNode> {
    //     return this.createDatNode(id, archivePath, {watch:true, temp:true})
    // }
    // createIncomingArchive(id:string, key:string, archivePath:string): Promise<DatNode> {
    //     return this.createDatNode(id, archivePath, { key: key})
    // }
    // createTransientIncomingArchive(id:string, key:string): Promise<DatNode> {
    //     return this.createDatNode(id, ram, { key: key, temp: true })
    // }
    DatManager.prototype.getDatNode = function (id) {
        var me = this;
        return me._datnodes[id];
    };
    DatManager.prototype.createDatNode = function (id, archive, options) {
        var me = this;
        return new Promise(function (resolve, reject) {
            if (me._datnodes[id]) {
                return reject(new Error("DatNode with ID " + id + " already exists"));
            }
            else {
                me._datnodes[id] = new DatNode(id, archive, options);
                return resolve(me._datnodes[id]);
            }
        });
    };
    DatManager.prototype.disposeDatNode = function (id) {
        var me = this;
        return new Promise(function (resolve, reject) {
            var datnode = me.getDatNode(id);
            delete me._datnodes[id];
            if (datnode) {
                try {
                    datnode.close();
                }
                catch (error) {
                    console.error("Error while closing '" + id);
                    // console.error(error)
                    return reject(datnode);
                }
            }
            return resolve(datnode);
        });
    };
    DatManager.prototype.shutdown = function () {
        var me = this;
        var subPromises = [];
        Object.keys(me._datnodes).forEach(function (id) {
            subPromises.push(me.disposeDatNode(id)
                .catch(function (error) {
                console.error("Unexpected error while closing datnode " + id);
                // console.error(error)
            }));
        });
        return Promise.all(subPromises)
            .then(function () {
            return new Promise(function (resolve, reject) {
                if (Object.keys(me._datnodes).length > 0) {
                    console.error("Not all dat nodes were closed during shutdown:");
                    console.error(Object.keys(me._datnodes));
                }
                me._datnodes = {};
                resolve();
            });
        })
            .catch(function (error) {
            console.error("Unexpected error while shutting down datmanager");
            console.error(error);
        });
    };
    return DatManager;
}());
exports.DatManager = DatManager;
var DatNode = /** @class */ (function (_super) {
    __extends(DatNode, _super);
    function DatNode(id, archive, options) {
        var _this = _super.call(this) || this;
        _this._options = {};
        _this._id = id;
        _this._archive = archive;
        _this._options = options;
        return _this;
    }
    DatNode.prototype.getArchiveKey = function () {
        return this._dat.key.toString('hex');
    };
    DatNode.prototype.getID = function () {
        return this._id;
    };
    DatNode.prototype.peerFound = function () {
        return !!+this._dat.network.connected;
    };
    DatNode.prototype.peerSearching = function () {
        return !!+this._dat.network.connecting;
    };
    DatNode.prototype.peerNotFound = function () {
        return (!this._dat.network.connected || !this._dat.network.connecting);
    };
    DatNode.prototype.initializeArchive = function (callback) {
        var me = this;
        if (callback) {
            me.once('create', callback);
        }
        return new Promise(function (resolve, reject) {
            Dat(me._archive, me._options, function (err, dat) {
                if (err) {
                    me.emit('create', me, err);
                    console.error('Failed to initialize archive:');
                    console.error(err);
                    return reject(err);
                }
                else {
                    me._dat = dat;
                    me._stats = dat.trackStats();
                    me.emit('create', me);
                    return resolve(me);
                }
            });
        });
    };
    DatNode.prototype.joinNetwork = function (callback) {
        var me = this;
        if (callback) {
            me.once('join', callback);
        }
        return new Promise(function (resolve, reject) {
            me._dat.joinNetwork(function (err) {
                if (err) {
                    me.emit('join', me, err);
                    console.error('Failed to join network:');
                    console.error(err);
                    return reject(err);
                }
                else {
                    me.emit('join', me);
                    return resolve(me);
                }
            });
        });
    };
    DatNode.prototype.importFiles = function (callback) {
        var me = this;
        if (callback) {
            me.once('import', callback);
        }
        return new Promise(function (resolve, reject) {
            me._dat.importFiles(function (err) {
                if (err) {
                    me.emit('import', me, err);
                    console.error('Failed to import files:');
                    console.error(err);
                    return reject(err);
                }
                else {
                    me.emit('import', me);
                    return resolve(me);
                }
            });
        });
    };
    DatNode.prototype.close = function (callback) {
        var me = this;
        if (callback) {
            me.once('close', callback);
        }
        return new Promise(function (resolve, reject) {
            try {
                if (me._dat && me._dat.network) {
                    me._dat.network.close();
                }
                me.emit('close', me);
                return resolve(me);
            }
            catch (error) {
                me.emit('close', me);
                return reject(error);
            }
        });
    };
    return DatNode;
}(events_1.EventEmitter));
exports.DatNode = DatNode;
//# sourceMappingURL=Dat.js.map