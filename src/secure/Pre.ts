"use strict"

import {PyShell, PyShellOptions, Mode} from "../base/PyShell"
export class Pre {
    script: any;
    constructor(script?) {
        if (script) {
            this.script = script
        } else {
            this.script = 'pre.py'
        }
     }

    public Execute(callback){
        let options = new PyShellOptions(Mode.Text, 'build/python/myenv/bin/python')
        let pyshell = new PyShell('build/python/'+ this.script, options)
        pyshell.Run('build/python/'+ this.script, function(err, msg){
           return callback(msg)
        })
    }

    public GenKey(callback){
        this.Execute(function(msg){
            //console.log('------- unparsed msg', msg[0], JSON.stringify(msg[0]))
            return callback(JSON.parse(JSON.stringify(msg[0])))
        })
    }
}