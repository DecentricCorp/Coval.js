from npre import bbs98
from nkms.crypto.encrypting_keypair import EncryptingKeypair
pre = bbs98.PRE()
''' 
Private Rekey from npre
pre = bbs98.PRE()
backup = pre
sk_a = pre.gen_priv(dtype=bytes)
pk_a = pre.priv2pub(sk_a)
sk_b = pre.gen_priv(dtype=bytes)
pk_b = pre.priv2pub(sk_b)
msg = 'Hello world'
emsg = pre.encrypt(pk_a, msg)

#print(pre.decrypt(sk_a, emsg))
#print(pre.decrypt(sk_b, emsg))
re_ab = pre.rekey(sk_a, sk_b)
emsg_b = pre.reencrypt(re_ab, emsg)
print(pre.decrypt(sk_b, emsg_b)) '''

''' 
Decrypt from nkms
data = b'Hello world'
alice = EncryptingKeypair()
e = alice.encrypt(data)
assert alice.decrypt(e) == data

bob = EncryptingKeypair()
e = bob.encrypt(data, pubkey=alice.pub_key)
assert alice.decrypt(e) == data
print(alice.decrypt(e)) '''

data = b'Hello world'
alice = EncryptingKeypair()
bob = EncryptingKeypair()
ursula = EncryptingKeypair()

e = alice.encrypt(data)
re_ab = alice.rekey(bob.pub_key)
print('-------------- alice rekey re_ab')
print(re_ab)

e_b = ursula.reencrypt(re_ab, e)
print('-------------- ursula re-encrypt')
print(e_b)

assert bob.decrypt(e_b) == data
print('-------------- alice attempt decrypt')
print(alice.decrypt(e))
print(bob.decrypt(e_b))
print(ursula.decrypt(e_b))

