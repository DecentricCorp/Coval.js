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

    CalculateBip32(seed, coin){
        const root = bip32.fromSeed(Buffer.from(seed, 'hex'), supportedCoins[coin].toBitcoinJS())
        var address = bitcoin.payments.p2pkh({ pubkey: root.publicKey, network: supportedCoins[coin].toBitcoinJS()}).address
        return {pk: root, pubkey: root.publicKey, address: address}
    }

    CalculateBip32FromPhrase(phrase, coin){
        const mnemonic = new Mnemonic.Mnemonic()
        var seed = mnemonic.ToSeedHex(phrase)
        var network = supportedCoins[coin].toBitcoinJS()
        //console.log(network)
        const root = bip32.fromSeed(Buffer.from(seed, 'hex'), network)
        const path = "m/0'/1337'/0'/0"
        const child = root.derivePath(path)
        const key = child.derive(0)

        var address = bitcoin.payments.p2pkh({ pubkey: key.publicKey, network: supportedCoins[coin].toBitcoinJS()}).address
        //var address = bitcoin.payments.p2wpkh({ pubkey: child.publicKey, network: supportedCoins[coin].toBitcoinJS()}).address
        return {root: root, pubkey: root.publicKey, address: address, seed: seed, rootKey: root.toBase58(), phrase: phrase, child: child.toBase58()}
    }
}