"use strict"
var secrets = require('secrets.js-grempe')
var collector = require('./envelope')
module.exports = {
    Server: function(){
        var envelope
        var key
        this.getKey = function() {
            if(!key) {
                key = secrets.random(512)
                envelope = new collector.Envelope(key)
            } else {
                envelope = new collector.Envelope(key, "Key accessed twice!")
            }
            return envelope
        }
    }
}