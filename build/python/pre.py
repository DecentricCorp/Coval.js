from nkms.crypto.encrypting_keypair import EncryptingKeypair

data = b'Hello world'
alice = EncryptingKeypair()
bob = EncryptingKeypair()
ursula = EncryptingKeypair()

e = alice.encrypt(data)
re_ab = alice.rekey(bob.pub_key)

e_b = ursula.reencrypt(re_ab, e)
print('------------ data encrypted by alice')
print(e)

assert bob.decrypt(e_b) == data
print(bob.decrypt(e_b))

