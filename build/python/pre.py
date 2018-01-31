from npre import bbs98
from npre import umbral
from npre.umbral import RekeyFrag
import npre.elliptic_curve as ec
from npre.encrypting_keypair import EncryptingKeypair

data = b'Hello Bob'

''' All actors generate their keys '''
alice = EncryptingKeypair()
bob = EncryptingKeypair()
ursula = EncryptingKeypair()

''' Alice encrypts some data '''
e = alice.encrypt(data)

''' Alice can decrypt own data '''
assert data == alice.decrypt(e)

''' Alice creates ephemeral key aimed at bob's pubkey '''
re_ab = alice.rekey(bob.pub_key)

''' Ursula takes ephemeral key and encrypted data and re-encrypts the data for bob '''
e_b = ursula.reencrypt(re_ab, e)

''' Bob can decrypt re-encrypted data '''
assert data == bob.decrypt(e_b)

''' Alice creates an ephemeral key that's split into pieces '''
kfrags = alice.split_rekey(bob.pub_key, 1, 3)

''' Ursula uses any single piece to re-encrypt the original encrypted data for bob's pubkey '''
re_data = ursula.reencrypt(kfrags[2], e)

''' Bob decrypts re-keyed data '''
re_decrypt = bob.decrypt(re_data)

assert re_decrypt == data
print(re_decrypt)



