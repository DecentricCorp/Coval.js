import * as bitcoin from 'bitcoinjs-lib'
import * as bip32 from 'bip32'
import {coininfo, supportedCoins} from "coininfo"

export class GenerateKey {
    GenerateRandomKeyPair(rng){
        const keyPair = bitcoin.ECPair.makeRandom({ rng: rng })
        return keyPair
    }

    CalculateBip32(seed, coin){
        const root = bip32.fromSeed(Buffer.from(seed, 'hex'), supportedCoins[coin].toBitcoinJS())
        var address = bitcoin.payments.p2pkh({ pubkey: root.publicKey, network: supportedCoins[coin].toBitcoinJS()}).address
        return {pk: root, pubkey: root.publicKey, address: address}
    }
}