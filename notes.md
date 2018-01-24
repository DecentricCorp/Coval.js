- Actors
    - [ZK]            is an ephemeral agent that knows very little
    - [ID_Provider]   is a storage space that keeps unique keys for each user
        - becomes an agent using stored keys
        - requires an auth token
    - (Identity)      is a third party that provides ID verification and storage
    - (Ledger)        is multichain instance
    - (Sender)        is a user operated agent/wallet
    - (Recipient)     is a user operated agent/wallet

- Creation                  
    - [ZK] is born
    - (Sender) authenticates with (Identity) Provider
    - (Sender) passes auth_token to [ZK]
    - [ZK] generates entropy
    - [ZK] splits pieces into 2 pieces
    - [ZK] spawns ID_Provider process using auth_token
        - [ID_Provider] creates and stores keys with (Identity) Provider
        - [ID_Provider] stores pub_key on (Ledger)
    - [ZK] encrypts piece1 and piece2 using [ID_Provider].pub_key
    - [ZK] sends encrypted piece1 to to (Ledger)
    - [ZK] sends encrypted piece2 to to Sender
    - [ZK] dies

- Send
    - [ZK] is born
    - (Sender) authenticates with (Identity) Provider
    - (Sender) passes auth_token and recipient.pub_key to [ZK]
    - (Sender) sends encrypted piece2 to (Recipient)
    - [ZK] spawns (Sender)[ID_Provider] process using auth_token and recipient.pub_key
        - (Sender)[ID_Provider] creates rekey for recipient.pub_key
        - (Sender)[ID_Provider] stores re-key within (Recipient)[ID_Provider].pub_key
    - [ZK] dies

- Claim
    - [ZK] is born
    - (Recipient) authenticates with (Identity) Provider
    - (Recipient) passes auth_token to [ZK]
    - [ZK] spawns (Recipient)[ID_Provider] process using auth_token
        - (Recipient)[ID_Provider] re-encrypts encrypted piece1 using (Recipient)[ID_Provider].rekey
        - (Recipient)[ID_Provider] re-encrypts encrypted piece2 using (Recipient)[ID_Provider].rekey
    - [ZK] sends re-encrypted data pieces to (Recipient)
    - [ZK] dies





