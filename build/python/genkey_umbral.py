#from pyUmbral.umbral.encrypting_keypair import EncryptingKeypair
#import json
import binascii


## keys = EncryptingKeypair()
#print('---keys', keys.pub_key)

## keyshex = binascii.hexlify(keys.pub_key)
#print('----keys hex', keyshex)

#json_string = json.dumps(keys.pub_key)
#print('---serialized', json_string)
from umbral import umbral
pre = umbral.PRE(umbral.UmbralParameters())
priv_key = pre.gen_priv()
pub_key = pre.priv2pub(priv_key)
sym_key, capsule = pre.encapsulate(pub_key)
pub_keyshex = binascii.hexlify(pub_key.to_bytes())
priv_keyshex = binascii.hexlify(priv_key.to_bytes())
print('{pair: {pub:"',pub_keyshex,'", priv: "',priv_keyshex,'"}}')#,sym: "',sym_key,'", capsule: "', capsule, '"}}')