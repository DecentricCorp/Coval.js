from npre import bbs98
from npre import umbral
from npre.umbral import RekeyFrag
import npre.elliptic_curve as ec
from npre.encrypting_keypair import EncryptingKeypair


sender = EncryptingKeypair()
recipient = EncryptingKeypair()
zero_knowledge_actor = EncryptingKeypair()
     
id_provider = {
    'sender' : { 'pub_key': sender.pub_key, 'signer': EncryptingKeypair() },
    'recipient' : { 'pub_key': recipient.pub_key, 'signer': EncryptingKeypair() },
    'zk' : {}
} 
'''a signer is a key stored with provider for each user that becomes an HD EncryptingKeypair()'''

def Decrypt_By_AndExpect(encrypted, who, expect: bool):
    actual = expect
    try:
        who.decrypt(encrypted)
    except Exception as e:
        actual = not actual
    return actual

data1 = b'Hello Recipient'
data2 = b'Secret Msg'

''' 
        ************ Piece 1 *********** 
'''

''' ZK encrypts data1 for Sender '''
zk_encrypted_data = zero_knowledge_actor.encrypt(data1, sender.pub_key)

''' ZK encrypts and stores data2 for sender.provider'''
id_provider['sender']['piece'] = zero_knowledge_actor.encrypt(data2, id_provider['sender']['signer'].pub_key)

'''
 ZK can NOT decrypt data meant for sender
'''
assert Decrypt_By_AndExpect(zk_encrypted_data, zero_knowledge_actor, False)

'''
 Sender can decrypt data meant for sender
'''
assert Decrypt_By_AndExpect(zk_encrypted_data, sender, True)

''' 
 Sender creates rekey for ZK
'''
rekey_for_zk = sender.rekey(zero_knowledge_actor.pub_key)

''' ID Provider rekeys zk '''
id_provider['zk']['rekey'] = id_provider['sender']['signer'].rekey(zero_knowledge_actor.pub_key)

''' 
 ZK Actor can NOT decrypt server encrypted data 
'''
assert Decrypt_By_AndExpect(zk_encrypted_data, zero_knowledge_actor, False)

''' 
 ZK Actor uses zk rekey and encrypted data and re-encrypts for Recipient 
'''
zk_encrypted_for_zk = zero_knowledge_actor.reencrypt(rekey_for_zk, zk_encrypted_data)
id_encrypted_for_zk = id_provider['sender']['signer'].reencrypt(id_provider['zk']['rekey'], id_provider['sender']['piece'])
id_provider['zk']['rekey'] = 0

''' 
 ZK Actor can decrypt zk rekeyed encrypted data 
'''
assert Decrypt_By_AndExpect(zk_encrypted_for_zk, zero_knowledge_actor, True)

'''
 ZK Actor decrypts and encrypts data for Recipient 
'''
zk_decrypted = zero_knowledge_actor.decrypt(zk_encrypted_for_zk)
zk_encrypted_for_recipient = zero_knowledge_actor.encrypt(zk_decrypted, recipient.pub_key)
id_decrypted = zero_knowledge_actor.decrypt(id_encrypted_for_zk)
id_provider['recipient']['piece'] = zero_knowledge_actor.encrypt(id_decrypted, id_provider['recipient']['signer'].pub_key)
id_provider['sender']['piece'] = 0

'''
 ZK Actor cannot decrypt zk re-encrypted data 
'''
assert Decrypt_By_AndExpect(zk_encrypted_for_recipient, zero_knowledge_actor, False)

'''
 Recipient can decrypt data 
'''
assert Decrypt_By_AndExpect(zk_encrypted_for_recipient, recipient, True)


''' ID provider can decrypt '''
Decrypt_By_AndExpect(id_provider['recipient']['piece'], id_provider['recipient']['signer'], True)

''' Old ID Provider can NOT decrypt '''
Decrypt_By_AndExpect(id_provider['recipient']['piece'], id_provider['sender']['signer'], False)
Decrypt_By_AndExpect(id_provider['sender']['piece'], id_provider['sender']['signer'], False)



print('Finished')





