"use strict"

import * as UserLib from "../base/User"
import * as DatNode from "dat-node"
import * as path from "path"
import * as fs from "fs"
import * as ram from "random-access-memory"
import * as mirror from "mirror-folder"
import {Envelope} from "../transport/Envelope"

export class Dat<B> {
    destination: string;
    network: any;
    src: string;
    dat: any = [];
    public user: UserLib.IUser
    constructor(UserType) {
        if (UserType) {
            this.user = this.As(UserType)
        } else {
            this.user = new UserLib.User()
        }
    }

    As<UserType extends UserLib.User>(UserObject: new () => UserType): UserType {
        return new UserObject()
    }

    Share(sharePath: string, callback, ignores?: string[]) {
        this.src = path.join(__dirname, sharePath)
        let src = this.src
        var logs = []
        var parent = this
        DatNode(this.src, { temp: true }, function (err, dat) {
            if (err) throw err
            parent.dat.push(dat)
            parent.network = dat.joinNetwork()
            parent.network.once('connection', function () {
                logs.push("Connected")
            })

            var progress = dat.importFiles(src, {
                ignore: ignores || []
            }, function (err) {
                if (err) throw err
                logs.push("Done importing")
                logs.push("Archive size: " + dat.archive.content.byteLength)
                return callback(dat.key.toString('hex'), logs)
            })
            progress.on('put', function (_src, dest) {
                logs.push("Added: " + dest.name)
            })
            logs.push(dat.key.toString('hex'))
        })
    }

    Download(destinationPath: string, key: any, callback) {
        this.destination = path.join(__dirname, destinationPath)
        let dest = this.destination
        var logs = []
        var parent = this
        var envelope = new Envelope()
        if (!fs.existsSync(dest)) fs.mkdirSync(dest)
        return DatNode(ram, { key: key, sparse: true }, function (err, dat) {
            if (err) throw err
            parent.dat.push(dat)
            parent.network = dat.joinNetwork(function(err){
                if (err) throw err
                if (!dat.network.connected || !dat.network.connecting) {
                    logs.push('No users currently online for that key.')
                    callback(logs)
                    return envelope
                }
            })
            parent.network.once('connection', function () {
                logs.push("Connected")
            })

            dat.archive.metadata.update(download)

            function download() {
                var progress = mirror({ fs: dat.archive, name: '/' }, dest, function (err) {
                    if (err) throw err
                    logs.push('Done')
                    callback(logs)
                    return envelope
                })
                progress.on('put', function (src) {
                    logs.push('Downloading', src.name)
                })
            }
        })

    }
}