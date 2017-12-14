"use strict"
import * as crypto from 'crypto'
export class Diffie {
    public dh: crypto.DiffieHellman;
    public keys: any;

    constructor(strength?, prime?, generator?, key?) {
        if (generator && prime) {
            this.dh = crypto.createDiffieHellman(prime, generator)
        }
        else {
            this.dh = crypto.createDiffieHellman(strength || 2048)
        }
        if (key) {
            this.dh.setPrivateKey(key)
        } 
        this.keys = this.dh.generateKeys()
    }

    public GetPubKey() {
        return this.dh.getPublicKey()
    }

    public GetPrime() {
        return this.dh.getPrime()
    }

    GetGenerator() {
        return this.dh.getGenerator()
    }

    GetPrivateKey() {
        return this.dh.getPrivateKey()
    }

    public GetSharedSecret(pubkey) {
        return this.dh.computeSecret(pubkey)
    }

    public Serialize() {
        return {
            pubkey: this.dh.getPublicKey(),
            privkey: this.dh.getPrivateKey(),
            prime: this.dh.getPrime(),
            generator: this.dh.getGenerator()
        }
    }


}