"use strict"

import {EventEmitter} from 'events';
import * as Dat from "dat-node"
import * as path from "path"
import * as fs from "fs"
import * as ram from "random-access-memory"

export class DatManager {

    _datnodes: {[index:string] : DatNode}

    public constructor() {
        this._datnodes = {}
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

    public getDatNode(id:string) {
        let me = this
        return me._datnodes[id]
    }

    public createDatNode(id:string, archive:string|{}, options:{}): Promise<DatNode> {
        let me = this
        return new Promise<DatNode>(function(resolve, reject) {
            if (me._datnodes[id]) {
                return reject(new Error("DatNode with ID " + id + " already exists"))
            } else {
                me._datnodes[id] = new DatNode(id, archive, options)
                return resolve(me._datnodes[id])
            }
        })
    }

    public disposeDatNode(id:string): Promise<DatNode> {
        let me = this
        return new Promise<DatNode>(function(resolve, reject) {
            let datnode:DatNode = me.getDatNode(id);
            delete me._datnodes[id];
            if (datnode) {
                try {
                    datnode.close()
                } catch (error) {
                    console.error("Error while closing '" + id)
                    // console.error(error)
                    return reject(datnode)
                }
            }
            return resolve(datnode)
        })
    }

    public shutdown(): Promise<any> {
        let me = this
        var subPromises = []
        Object.keys(me._datnodes).forEach(function (id) {
            subPromises.push(me.disposeDatNode(id)
                .catch(function(error) {
                    console.error("Unexpected error while closing datnode " + id )
                    // console.error(error)
                }))
        })
        return Promise.all(subPromises)
            .then(function() { return new Promise<void>(function (resolve, reject) {
                if (Object.keys(me._datnodes).length > 0) {
                    console.error("Not all dat nodes were closed during shutdown:")
                    console.error(Object.keys(me._datnodes))
                }
                me._datnodes = {}
                resolve()
            })})
            .catch(function(error) {
                console.error("Unexpected error while shutting down datmanager")
                console.error(error)
            })
    }
}

export class DatNode extends EventEmitter {
    _id: string
    _archive: string|{}
    _options: {[index:string] : any} = {}
    _dat: any
    _stats:any

    constructor(id:string, archive:string|{}, options:{[index:string] : any}) {
        super()
        this._id = id
        this._archive = archive
        this._options = options
    }

    public getArchiveKey() : string {
        return this._dat.key.toString('hex')
    }

    public getID() {
        return this._id
    }

    peerFound(): boolean {
        return !!+this._dat.network.connected
    }

    peerSearching(): boolean {
        return !!+this._dat.network.connecting
    }

    peerNotFound(): boolean {
        return (!this._dat.network.connected || !this._dat.network.connecting)
    }

    initializeArchive(callback?:(datnode:DatNode, err?:{}) => void): Promise<DatNode> {
        let me = this
        if (callback) {
            me.once('create', callback);
        }
        return new Promise<DatNode>(function(resolve, reject) {
            Dat(me._archive, me._options, function(err, dat) {
                if (err) {
                    me.emit('create', me, err)
                    console.error('Failed to initialize archive:')
                    console.error(err)
                    return reject(err)
                } else {
                    me._dat = dat
                    me._stats = dat.trackStats()
                    me.emit('create', me)
                    return resolve(me)
                }
            })
        })
    }

    joinNetwork(callback?:(datnode:DatNode, err?:{}) => void): Promise<DatNode> {
        let me = this;
        if (callback) {
            me.once('join', callback);
        }
        return new Promise<DatNode>(function(resolve, reject) {
            me._dat.joinNetwork(function(err) {
                if (err) {
                    me.emit('join', me, err)
                    console.error('Failed to join network:')
                    console.error(err)
                    return reject(err)
                } else {
                    me.emit('join', me)
                    return resolve(me)
                }
            });
        })
    }

    importFiles(callback?:(datnode:DatNode, err?:{}) => void): Promise<DatNode> {
        let me = this;
        if (callback) {
            me.once('import', callback);
        }
        return new Promise<DatNode>(function(resolve, reject) {
            me._dat.importFiles(function(err) {
                if (err) {
                    me.emit('import', me, err)
                    console.error('Failed to import files:')
                    console.error(err)
                    return reject(err)
                } else {
                    me.emit('import', me)
                    return resolve(me)
                }
            })
        })
    }

    close(callback?:(datnode:DatNode) => void): Promise<DatNode> {
        let me = this;
        if (callback) {
            me.once('close', callback);
        }
        return new Promise<DatNode>(function(resolve, reject) {
            try {
                if (me._dat && me._dat.network) {
                    me._dat.network.close()
                }
                me.emit('close', me);
                return resolve(me)
            } catch (error) {
                me.emit('close', me);
                return reject(error)
            }
        })
    }
}
