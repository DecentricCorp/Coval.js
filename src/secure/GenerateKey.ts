import * as bitcoin from 'bitcoinjs-lib'
import * as bip32 from 'bip32'
import {coininfo, supportedCoins} from "coininfo"
import * as Mnemonic from "./Mnemonic"

export class GenerateKey {

    
    
    GenerateRandomKeyPair(rng, coin?){
        var network = supportedCoins[coin || "bitcoin"].toBitcoinJS()
        const keyPair = bitcoin.ECPair.makeRandom({ rng: rng, network: network })
        return keyPair
    }

    CalculateBip32FromSeed(seed, coin){
        const root = bip32.fromSeed(Buffer.from(seed, 'hex'), supportedCoins[coin].toBitcoinJS())
        //var address = bitcoin.payments.p2pkh({ pubkey: root.publicKey, network: supportedCoins[coin].toBitcoinJS()}).address
        //return {pk: root, pubkey: root.publicKey, address: address}
        return root
    }

    CalculateBip32FromPhrase(phrase, coin){
        const mnemonic = new Mnemonic.Mnemonic()
        var seed = mnemonic.ToSeedHex(phrase)
        var network = supportedCoins[coin].toBitcoinJS()
        const root = bip32.fromSeed(Buffer.from(seed, 'hex'), network)
        return root
        //var bip44 = this.DeriveBip44Addresses(root, coin)

        //console.log(network)
        //var address = bitcoin.payments.p2wpkh({ pubkey: child.publicKey, network: supportedCoins[coin].toBitcoinJS()}).address
        //return {root: root, pubkey: root.publicKey, address: bip44.address, seed: seed, rootKey: root.toBase58(), phrase: phrase, child: bip44.key.toBase58()}
    }

    DeriveBip44(root, coin, count, cb){  
        const network = supportedCoins[coin].toBitcoinJS()
        const coinId = network.versions.bip44
        const path = "m/44'/"+coinId+"'/0'/0"
        const child = root.derivePath(path)
        var addresses = []
        getAddressAtIndex(0)
        function getAddressAtIndex(index){
            const key = child.derive(index)
            var address = bitcoin.payments.p2pkh({ pubkey: key.publicKey, network: network}).address
            addresses.push(address)
            if (index === count -1) {
                return cb(addresses)
            } else {
                return getAddressAtIndex(index + 1)
            }
        }
    }

    GetAllAddresses(phrase, cb) { 
        var root_class = this
        var coins = Object.keys(supportedCoins)
        var addresses = {}
        getAddress(0)
        function getAddress(index) {
            var coin = coins[index]
            var root = root_class.CalculateBip32FromPhrase(phrase, coin)
            root_class.DeriveBip44(root, coin, 1, function(address){
                addresses[coin] = { address: address[0], unit: supportedCoins[coin].unit }
                return handleReturn()
            })   
            function handleReturn(){
                if (index === coins.length -1) {
                    return cb(addresses)
                } else {
                    return getAddress(index + 1)
                }
            }         
        }
    }
}