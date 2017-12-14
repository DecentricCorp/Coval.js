"use strict"

export class Utils {
    public HexEncode(input?: any) {
        var hex, i
        var result = ""
        for (i=0; i<input.length; i++) {
            hex = input.charCodeAt(i).toString(16)
            result += ("000"+hex).slice(-4)
        }
        return result
    }
    public HexDecode(j: any) {
        //var j
        var hexes = j.match(/.{1,4}/g) || []
        var back = ""
        for(j = 0; j<hexes.length; j++) {
            back += String.fromCharCode(parseInt(hexes[j], 16))
        }
        return back
    }
}