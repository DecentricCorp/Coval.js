"use strict"
import * as mneumonic from "bip39"
import * as bip39Shamir from "bip39shamir-web"

export class Mnemonic {
    seed: any;
    constructor(seed?) { 
        if (seed) {
            this.seed = Buffer.from(seed, 'hex')
        }
    }

    Generate(strength?){
        if (this.seed) {
            return mneumonic.entropyToMnemonic(this.seed)
        } else {
            return mneumonic.generateMnemonic(strength || 128)
        }
    }

    ToSeedHex(phrase){
        return mneumonic.mnemonicToSeedHex(phrase)
    }

    ToEntropy(phrase){
        if (!phrase) {
            return "Missing Phrase"
        } else {
            return mneumonic.mnemonicToEntropy(phrase)
        }
    }

    Split(quantity?, threshold?, phrase?){
        var shares = bip39Shamir.shares(phrase || this.Generate(128), quantity || 3, threshold || 2)
        return shares
    }

    Combine(shares) {
        return bip39Shamir.combine(shares)
    }

}