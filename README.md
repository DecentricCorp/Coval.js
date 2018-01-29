# Coval.js
Coval strongly typed cryptocurrency framework

# To install and test
`git clone https://github.com/DecentricCorp/Coval.js.git`
`cd Coval.js`
`npm install`
`npm test`

## Test Results

- Dat
   - Share
     - ✓ should resolve provided path correcty (87ms)
      - ✓ should allow for multiple shares with unique keys
      - ✓ should allow for downloading a share (104ms)
      - ✓ should error when no shares exist for key (235ms)

 - Emblem
   - Add Dat
      - ✓ should sucessfully add dat to emblem
      - ✓ should only allow single dat of any type to be added
   - HasRequiredDats
      - ✓ should be false when required dats are not fulfilled
      - ✓ should be true when required dats are fulfilled
   - Claimed
      - ✓ should return false until claimed

 - Envelope
    - ✓ should be able to assign value
    - ✓ err should return errors
    - ✓ payload should return entire envelope object
    - ✓ should correctly report having errors

 - Lightrail
    - ✓ should instantiate without options
    - ✓ should instantiate with some options
    - ✓ should instantiate with some all options
    - ✓ should allow creation of new contacts
    - ✓ should load with apiKey from environment
    - ✓ should create new user (447ms)
    - should handle lost connection gracefully

 - PyShellOptions
    - ✓ is created sucessfully
    - ✓ should execute simple python script (62ms)
    - ✓ should execute interactive python script (43ms)

 - Protected
    - ✓ should not be able to access internal value
    - ✓ should return expected value
    - ✓ should not allow value to be accessed twice
    - ✓ should record error when read attempted twice

 - Shamir
   - GetKey
      - ✓ should not be null
      - ✓ should return unique keys when called on unique objects
      - ✓ should log error when accessing key twice
   - CreateShares
      - ✓ should split key into 2 shares
   - CombineShares
      - ✓ should combine shares

 - Caesar
   - genKey
      - ✓ should return private key (194ms)
   - key time signatures
      - ✓ should sign msg successfully (555ms)
   - disk encryption
      - ✓ encrypted stream should decrypt to desired text

 - HDKey
   - hdkey
      - ✓ Standard HD Key returns key and correctly derived address
      - ✓ Specific namespace should return expected address/keys

 - Diffie
    - ✓ should be able to recreate key object from provided bits
   - Get Pubkey
      - ✓ should generate a key
      - ✓ should produce different pubkeys for unique objects
      - ✓ should produce same pubkey when called on same object
   - Get Shared Secret
      - ✓ should compute secret from personal private and externally supplied public keys

 - NuCypher
    - ✓ should execute (491ms)
    - ✓ should generate keypair (254ms)

 - Unloq
    - ✓ should instantiate with provided api key
    - ✓ should instantiate without api key
   - Authenticate
      - should fail gracefully on incorrect email
      - should fail gracefully on no api key
      - ✓ should sucessfully authenticate with unloq
   - Authorize
      - ✓ should allow for sucessful authorization

 - User
   - Dat
      - ✓ Should identify as client when cast as client
      - ✓ Should identify as unloq when cast as unloq
      - ✓ Should identify as server when cast as server
      - ✓ Should identify as generic when not cast

 - Utils
   - Hex
     - Encode
        - ✓ should correctly encode simple string to hex
        - ✓ should correctly encode empty space to hex
     - Decode
        - ✓ should correctly decode simple string


 - 54 passing (3s)
  - 3 pending
