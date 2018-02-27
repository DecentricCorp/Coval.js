"use strict"

import {EventEmitter} from 'events';
import * as Dat from "dat-node"
import * as path from "path"
import * as fs from "fs"
import * as ram from "random-access-memory"


export class DatManager extends EventEmitter {

    private _datnodes:{} = {};

    createOutgoingArchive(archivePath:string, callback?:(datman:DatManager, datnode:DatNode, error?:any) => void) {
        this.createDatNode(archivePath, {}, callback);
    }

    createTransientOutgoingArchive(archivePath:string, callback?:(datman:DatManager, datnode:DatNode, error?:any) => void) {
        this.createDatNode(archivePath, {temp:true}, callback);
    }

    createIncomingArchive(key:string, archivePath:string, callback?:(datman:DatManager, datnode:DatNode, error?:any) => void) {
        this.createDatNode(archivePath, { key: key}, callback);
    }

    createTransientIncomingArchive(key:string, callback?:(datman:DatManager, datnode:DatNode, error?:any) => void) {
        this.createDatNode(ram, { key: key, temp: true }, callback);
    }

    createDatNode(archive:string|{}, options:{}, callback?:(datman:DatManager, datnode:DatNode, error?:any) => void) {
        if (callback) {
            this.once('create', callback);
        }
        let me = this;
        Dat(archive, options, function(err, dat) {
            if (err) {
                me.emit('create', me, undefined, err);
            } else {
                let datnode = new DatNode(dat);
                me._datnodes[datnode.getKey()] = datnode;
                // datnode.initStats();
                me.emit('create', me, datnode);
            }
        });
    }

    getDatNode(key:string, callback?:(datman:DatManager, datnode:DatNode) => void) {
        return this._datnodes[key];
    }

    getDatNodes() {
        return {...(this._datnodes)};
    }

    disposeDatNode(key:string, callback?:(datman:DatManager, datnode:DatNode) => void) {
        if (callback) {
            this.once('dispose', callback);
        }
        let datnode:DatNode = this.getDatNode(key);
        if (datnode) {
            delete this._datnodes[key];
            let me = this;
            datnode.close(() => {
                me.emit('dispose', me, datnode);
            })
        } else {
            this.emit('dispose', this, null);
        }
    }

    shutdown() {
        let me = this;
        Object.keys(this._datnodes).forEach(function (key) {
            me.disposeDatNode(key);
        })
    }

}

export class DatNode extends EventEmitter {
    _dat: any;
    _key: string;
    _stats:any;

    constructor(dat:any) {
        super()
        this._dat = dat;
        this._key = dat.key.toString('hex');
        this._stats = this._dat.trackStats();
    }

    getKey() : string {
        return this._key;
    }

    importFiles(callback?:(datnode:DatNode, err?:{}) => void) : void {
        if (callback) {
            this.once('import', callback);
        }
        let me = this;
        this._dat.importFiles(function(err) {
           me.emit('import', me, err);
        });
    }

    close(callback?:(datnode:DatNode) => void): void {
        if (callback) {
            this.once('close', callback);
        }
        let me = this;
        this._dat.close(function(){
            me.emit('close', me);
        });
    }
}





//     createNode(callback?) {
//         if (callback) {
//             this.once('create', callback);
//         }
//         if (this.datnode) {
//              me.emit('create', me);
//         } else {
//             let me = this;
//             DatNode(this.src, { temp: true }, (err, datnode) => {
//                 if(me.datnode) {
//                     datnode.close();
//                 } else {
//                     me.datnode = datnode;
//                     me.key = datnode.key.toString('hex');
//                 }
//                 me.emit('create', me);
//         });
//     }

//     joinNetwork(datnode, callback, me?:Dat) {
//         console.log("Joining network.")
//         me = me || this;
//         me.network = datnode.joinNetwork((err)=>{
//             if (err)
//                 console.log("WTF Charles: " + err.message)
//         });
//         me.network.once('connection', function (err) {
//             console.log("Connected")
//         });
//         me.emit('joinnetwork')
//         console.log("Join network complete, making callback")
//         callback(datnode, me);
//     }

//     importFiles(datnode, callback, me?:Dat) {
//         console.log("Importing files")
//         me = me || this;
//         var progress = datnode.importFiles(me.src, function(err, stats?) {
//             debugger
//             console.log("files import complete, making callback");
//             me.emit('importFiles')
//             callback(datnode, me);
//         })
//         progress.on('put', function (src, dest) {
//             console.log("Added: " + dest.name)
//         })
//     }

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