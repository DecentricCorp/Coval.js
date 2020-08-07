from nkms.crypto.encrypting_keypair import EncryptingKeypair
#import json
import binascii


keys = EncryptingKeypair()
#print('---keys', keys.pub_key)

keyshex = binascii.hexlify(keys.pub_key)
#print('----keys hex', keyshex)

#json_string = json.dumps(keys.pub_key)
#print('---serialized', json_string)

print('{pair: {pub:"',keys.pub_key,'", priv: "',keys._priv_key,'"}}')
