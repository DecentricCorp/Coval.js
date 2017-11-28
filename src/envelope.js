"use strict"

var Envelope = function(value, err, msg){
    var errors = []
    var msgs = []
    if (err) {
        errors[errors.length] = err
    }
    if (msg) {
        msgs[msgs.length] = msg
    }
    return {
        toString: function () {
            return value.toString()
        },
        err: errors,
        msg: msgs,
        valueOf: function() {
            return value
        },
        payload : {
            value: value || "",
            err: errors,
            msg: msgs
        }
    }
}

module.exports.Envelope = Envelope