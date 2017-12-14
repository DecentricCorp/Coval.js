"use strict"

import {PyShell, PyShellOptions, Mode} from "../base/PyShell"
export class Pre {
    constructor() { }

    public Execute(callback){
        let options = new PyShellOptions(Mode.Text, 'build/python/myenv/bin/python')
        let pyshell = new PyShell('build/python/pre.py', options)
        pyshell.Run('build/python/pre.py', function(err, msg){
           return callback(msg)
        })
    }
}