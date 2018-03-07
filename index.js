var secrets = require('secrets.js-grempe')
// generate a 512-bit key
var serverkey = secrets.random(512) // => key is a hex string
var clientkey = secrets.random(512) // => key is a hex string
var servershares = secrets.share(serverkey, 2, 2) // split into 2 shares with a threshold of 2
var clientshares = secrets.share(clientkey, 3, 2) // split into 3 shares with a threshold of 2
console.log('-=-=-=-=-=- Server -=-=-=-=-=-')
console.log('server generated key', serverkey)
console.log('server split shares', JSON.stringify(servershares, null, 2))
console.log('-=-=-=-=-=- Client -=-=-=-=-=-')
console.log('client generated key', clientkey)
console.log('client split shares', JSON.stringify(clientshares, null, 2))
console.log('to combine', servershares[0], clientshares[0])
var clientServerCombined = secrets.combine([servershares[0], clientshares[0]])
console.log('** client server single combined', clientServerCombined)
var newshares = [servershares[0], clientshares[0], clientshares[1], clientshares[2]]
console.log('new shares', JSON.stringify(newshares, null, 2))
var combined = secrets.combine(newshares)
console.log('** combined everything', combined)

var newShare = secrets.newShare(5, newshares) // => newShare = '804xxx...xxx'
console.log('new share', newShare)
var newCombined = secrets.combine( newshares.concat(newShare))
console.log('* new share + combined', JSON.stringify(newCombined, null, 2))
//console.log('new plus new', servershares[0], clientshares[1], newShare)
var twoCombined = secrets.combine([newshares[2], newshares[1]])
console.log('* 2 combined', twoCombined)
global.Promise = require('bluebird');