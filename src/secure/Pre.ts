"use strict"
var path = require( "path" )
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
        let options = new PyShellOptions(Mode.Text, '/usr/local/bin/python3')
        //var target = path.join(__dirname, '..', '..', '/build/python', this.script )
        var target = './build/python/pre.py'
        let pyshell = new PyShell(target, options)
        
        console.log('---------------- TARGET', target)
        console.log('---------------- DIR', __dirname)
        pyshell.Run(target, function(err, msg){
            return callback(msg, err)
        })
    }

    public GenKey(callback){
        this.Execute(function(msg){
            return callback(JSON.parse(JSON.stringify(msg[0])))
        })
    }
}