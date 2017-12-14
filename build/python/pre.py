from npre import bbs98
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
print(pre.decrypt(sk_b, emsg_b))
