"use strict"
let chai = require('chai')
let expect = chai.expect
let ManyKeys = require('../build/secure/ManyKeys')


describe('Manykeys', () => {
    it('generates every possible address from provided seed', function(){
        var key = entropyMock
        var manykeys = new ManyKeys.ManyKeys(key)
        var all = manykeys.GetAllAddresses()
        expect(all).to.deep.equal(addressMock)
    })
    it('generates every possible address from provided seed', function(){
        var key = entropyMock
        var manykeys = new ManyKeys.ManyKeys(key)
        var all = manykeys.GetAllKeys()
        expect(all).to.deep.equal(keysMock)
    })
    it('generates key from wif', ()=>{
        var wif = wifMock
        var manykeys = new ManyKeys.ManyKeys()
        var key = manykeys.KeyFromWif(wif)
        expect(key).to.deep.equal(fromWifMock)
    })
})

var entropyMock = 'ce16d8441c79fd5966098b7c55a0740f268355fc7806aa2193e5e99b53909fcb'
var fromWifMock = { 
    privateKey: '1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd',
    address: '1FkKMsKNJqWSDvTvETqcCeHcUQQ64kSC6s'
}
var wifMock = 'KwomKti1X3tYJUUMb1TGSM2mrZk1wb1aHisUNHCQXTZq5auC2qc3'
var addressMock = {
  '2give': { address: 'Go6fAaTSNKUp7ATQbu9S4g76HJs9sSzrLW', unit: '2give' },
  '42coin': { address: '4KcxeDDWMj7ekj8iqtpZ2nfhmfsuko5LeQ', unit: '42' },
  acoin: { address: 'AMh1Qqgq1S4o2EE2DBpLJfkWDEk4VpAZic', unit: 'acoin' },
  agacoin: { address: 'aVyCVMa7cFsN6EbDgMoTQC5hyWCf9NCtsm', unit: 'aga' },
  alphacoin: { address: 'a6dbWFGpu5QVGoT8ewU8v4ovLzwiQFy7fa', unit: 'alf' },
  alqo: { address: 'AMh1Qqgq1S4o2EE2DBpLJfkWDEk4VpAZic', unit: 'alqo' },
  animecoin: { address: 'AMh1Qqgq1S4o2EE2DBpLJfkWDEk4VpAZic', unit: 'ani' },
  anoncoin: { address: 'AMh1Qqgq1S4o2EE2DBpLJfkWDEk4VpAZic', unit: 'anc' },
  apexcoin: { address: 'AMh1Qqgq1S4o2EE2DBpLJfkWDEk4VpAZic', unit: 'apex' },
  auroracoin: { address: 'AMh1Qqgq1S4o2EE2DBpLJfkWDEk4VpAZic', unit: 'aur' },
  aquariuscoin: { address: 'AMh1Qqgq1S4o2EE2DBpLJfkWDEk4VpAZic', unit: 'arco' },
  axe: { address: 'XHGNcVBovpAMYmUXV18uXBuQwU97QEAAhd', unit: 'axe' },
  bbqcoin: { address: 'bJeQTaAh2co7j6sPjCU6NSdHEWiYZ6q6WN', unit: 'bqc' },
  biblepay: { address: 'BANDP4HQRnzYf6WCG2UyGvJ5UFFwqQvim6', unit: 'bbp' },
  bitcoin: { address: '16v8mLqCgHQeDG22eYA19nVQjdpN7D6zLT', unit: 'BTC' },
  bitcoincash: { address: '16v8mLqCgHQeDG22eYA19nVQjdpN7D6zLT', unit: 'bch' },
  bitcoindark: { address: 'RFCKqriVH7DDHGPE7i98FJpcVuGxjuMjig', unit: 'btcd' },
  bitcoingold: { address: 'GPm4BUA9f91wHjKKaUp7aYqJeocDADqzNU', unit: 'btg' },
  birdcoin: { address: 'L1oV3Sqk3mBpeda6oFoywgHPKLvhTSuJrB', unit: 'brd' },
  bitsynq: { address: 'STD8oBcMQebqjZoVBy95hgdyPR3nvG8Wvu', unit: 'synq' },
  bitzeny: { address: 'ZhHzX8yYBtwcTNK3dX8pRwY8iVgmhAgDR6', unit: 'zny' },
  blackcoin: { address: 'BANDP4HQRnzYf6WCG2UyGvJ5UFFwqQvim6', unit: 'BLK' },
  blackjack: { address: '9Z1oSd6Fb593PMwrAM9hLRCvxEEB3XzaVS', unit: 'jack' },
  blocknet: { address: 'BZhpNAah8yTRUXeHHSpHm3Zs6kWtd7bhXQ', unit: 'block' },
  bolivarcoin: { address: 'bJeQTaAh2co7j6sPjCU6NSdHEWiYZ6q6WN', unit: 'boli' },
  boxycoin: { address: 'XHGNcVBovpAMYmUXV18uXBuQwU97QEAAhd', unit: 'boxy' },
  bunnycoin: { address: 'BZhpNAah8yTRUXeHHSpHm3Zs6kWtd7bhXQ', unit: 'bun' },
  cagecoin: { address: 'DaPqHi58gsmoZhLiQYUtBfvoFGoc5JgieG', unit: 'cage' },
  campuscoin: { address: 'CNP2LPBGZLPB7PvTLHUvjJ7SMm2mynQGzs', unit: 'cmpco' },
  canadaecoin: { address: 'CNP2LPBGZLPB7PvTLHUvjJ7SMm2mynQGzs', unit: 'cdn' },
  cannabiscoin: { address: 'CNP2LPBGZLPB7PvTLHUvjJ7SMm2mynQGzs', unit: 'cann' },
  capricoin: { address: 'CNP2LPBGZLPB7PvTLHUvjJ7SMm2mynQGzs', unit: 'cpc' },
  cassubiandetk: { address: 'DB4EJbmqyhJvkGCdP89ZhYf1cmYfNeYtsr', unit: 'cdt' },
  cashcoin: { address: 'EnQeF2xzpRAS1zkyUoUqe3kA8naSJLVLKt', unit: 'cash' },
  catcoin: { address: '9Z1oSd6Fb593PMwrAM9hLRCvxEEB3XzaVS', unit: 'cat' },
  chaincoin: { address: 'CNP2LPBGZLPB7PvTLHUvjJ7SMm2mynQGzs', unit: 'chc' },
  colossuscoinxt: {
    address: 'DB4EJbmqyhJvkGCdP89ZhYf1cmYfNeYtsr',
    unit: 'colx'
  },
  condensate: { address: 'RFCKqriVH7DDHGPE7i98FJpcVuGxjuMjig', unit: 'rain' },
  copico: { address: 'CNP2LPBGZLPB7PvTLHUvjJ7SMm2mynQGzs', unit: 'xcpo' },
  coppercoin: {
    address: 'CNP2LPBGZLPB7PvTLHUvjJ7SMm2mynQGzs',
    unit: 'copper'
  },
  corgicoin: { address: 'CNP2LPBGZLPB7PvTLHUvjJ7SMm2mynQGzs', unit: 'corg' },
  coval: { address: '16v8mLqCgHQeDG22eYA19nVQjdpN7D6zLT', unit: 'coval' },
  cryptobullion: { address: '5XdmbY7NVGWHD2Yyv9pWVAV4fBejsiiEkU', unit: 'cbx' },
  cryptoclub: { address: 'FBkFE9GHXbdJqRu4WDpA8B1wmHqP1xCSeh', unit: 'ccb' },
  cryptoescudo: { address: 'CNP2LPBGZLPB7PvTLHUvjJ7SMm2mynQGzs', unit: 'cesc' },
  cryptonite: { address: 'CNP2LPBGZLPB7PvTLHUvjJ7SMm2mynQGzs', unit: 'xcn' },
  cryptowisdomcoin: {
    address: 'WUbAeGbEWTEbuuCMSAUGYwMqgTdDxFVB9Q',
    unit: 'cwis'
  },
  c2coin: { address: 'CNP2LPBGZLPB7PvTLHUvjJ7SMm2mynQGzs', unit: 'c2' },
  dash: { address: 'XgbybbV6dzdENCccWRUE1KBCZyQ47S7Cpt', unit: 'DASH' },
  deafdollars: { address: 'LR962Z92kwehU4iBpg9JRoZAwrBeAwQJPk', unit: 'deaf' },
  deeponion: { address: 'DaPqHi58gsmoZhLiQYUtBfvoFGoc5JgieG', unit: 'onion' },
  'deutsche emark': {
    address: 'NRq6x6dUJqy5ZEQcwmotrRv76NUMj8vPoV',
    unit: 'dem'
  },
  devcoin: { address: '16v8mLqCgHQeDG22eYA19nVQjdpN7D6zLT', unit: 'dvc' },
  digibyte: { address: 'DB4EJbmqyhJvkGCdP89ZhYf1cmYfNeYtsr', unit: 'DGB' },
  digitalcoin: { address: 'DB4EJbmqyhJvkGCdP89ZhYf1cmYfNeYtsr', unit: 'dgc' },
  dimecoin: { address: '78zBXyJXKzMnUm7L1q9nRfaDBCgWoRxWC1', unit: 'dime' },
  dnotes: { address: 'DaPqHi58gsmoZhLiQYUtBfvoFGoc5JgieG', unit: 'note' },
  dogecoin: { address: 'DB4EJbmqyhJvkGCdP89ZhYf1cmYfNeYtsr', unit: 'DOGE' },
  dogecoindark: { address: 'DB4EJbmqyhJvkGCdP89ZhYf1cmYfNeYtsr', unit: 'xvg' },
  egulden: { address: 'LR962Z92kwehU4iBpg9JRoZAwrBeAwQJPk', unit: 'efl' },
  ekrona: { address: 'KD8H5EFAdQG51mHvkR9LyRjp4LQp7bF3yZ', unit: 'krn' },
  electra: { address: 'EP53Fvfi7EhZCZctTP9X9vUNWHKVXouPAw', unit: 'eca' },
  ember: { address: 'e81dMLFhzt3FT8qzu8oKmKXne3X9WfGYbU', unit: 'emb' },
  emerald: { address: 'EnQeF2xzpRAS1zkyUoUqe3kA8naSJLVLKt', unit: 'emd' },
  emercoin: { address: 'EP53Fvfi7EhZCZctTP9X9vUNWHKVXouPAw', unit: 'emc' },
  energycoin: { address: 'e81dMLFhzt3FT8qzu8oKmKXne3X9WfGYbU', unit: 'enrg' },
  espers: { address: 'EP53Fvfi7EhZCZctTP9X9vUNWHKVXouPAw', unit: 'esp' },
  fastcoin: { address: 'fjN3HmSrqbtkisQLzp8bhpcwA4YvKpFyGX', unit: 'fst' },
  feathercoin: { address: '6jeaYs1EcotufKyEzQpTwYJRYhRa4hhnTp', unit: 'ftc' },
  fedoracoin: { address: 'EP53Fvfi7EhZCZctTP9X9vUNWHKVXouPAw', unit: 'tips' },
  fibre: { address: 'FBkFE9GHXbdJqRu4WDpA8B1wmHqP1xCSeh', unit: 'fibre' },
  florincoin: { address: 'FBkFE9GHXbdJqRu4WDpA8B1wmHqP1xCSeh', unit: 'flo' },
  flurbo: { address: 'FBkFE9GHXbdJqRu4WDpA8B1wmHqP1xCSeh', unit: 'flb' },
  fluttercoin: { address: 'FBkFE9GHXbdJqRu4WDpA8B1wmHqP1xCSeh', unit: 'flt' },
  frazcoin: { address: 'FBkFE9GHXbdJqRu4WDpA8B1wmHqP1xCSeh', unit: 'fraz' },
  freicoin: { address: '16v8mLqCgHQeDG22eYA19nVQjdpN7D6zLT', unit: 'frc' },
  fudcoin: { address: 'FBkFE9GHXbdJqRu4WDpA8B1wmHqP1xCSeh', unit: 'fud' },
  fuelcoin: { address: 'Fb5rDFZaEn6Bes39Xe9UcJHjPo6KfFRGK5', unit: 'fc2' },
  fujicoin: { address: 'Fb5rDFZaEn6Bes39Xe9UcJHjPo6KfFRGK5', unit: 'fjc' },
  gabencoin: { address: '7YKnX5bp3ApfJCFR3FV6unqzohwTSC5UHe', unit: 'gbn' },
  garlicoin: { address: 'GPm4BUA9f91wHjKKaUp7aYqJeocDADqzNU', unit: 'grlc' },
  globalboost: { address: 'GPm4BUA9f91wHjKKaUp7aYqJeocDADqzNU', unit: 'bsty' },
  goodcoin: { address: 'GPm4BUA9f91wHjKKaUp7aYqJeocDADqzNU', unit: 'good' },
  gridcoinresearch: {
    address: 'S3sXp5K4hU8xv8fQAYomDZNBkunrDRdyNf',
    unit: 'grc'
  },
  gulden: { address: 'GPm4BUA9f91wHjKKaUp7aYqJeocDADqzNU', unit: 'nlg' },
  guncoin: { address: 'Go6fAaTSNKUp7ATQbu9S4g76HJs9sSzrLW', unit: 'gun' },
  hamradiocoin: { address: '16v8mLqCgHQeDG22eYA19nVQjdpN7D6zLT', unit: 'ham' },
  hfrcoin: { address: '7YKnX5bp3ApfJCFR3FV6unqzohwTSC5UHe', unit: 'hfr' },
  hodlcoin: { address: 'HCSG9gkj5VwgvbbVdKUkYoNsup86XrT8BG', unit: 'hodl' },
  htmlcoin: { address: 'Hbms8o41ngQZk2jaejp52vefYKP3BwfdjS', unit: 'html' },
  hyperstake: { address: 'pBThy3hukPd9tyLAWd8HtTLTNexjHohHMq', unit: 'hyp' },
  imperiumcoin: { address: 'LR962Z92kwehU4iBpg9JRoZAwrBeAwQJPk', unit: 'mprm' },
  incakoin: { address: 'NRq6x6dUJqy5ZEQcwmotrRv76NUMj8vPoV', unit: 'nka' },
  incognitocoin: { address: '16v8mLqCgHQeDG22eYA19nVQjdpN7D6zLT', unit: 'icg' },
  influxcoin: { address: 'i9PfCREb6gg1dUEs9L8WcaFew66ad7n6uu', unit: 'infx' },
  iridiumcoin: { address: 'LR962Z92kwehU4iBpg9JRoZAwrBeAwQJPk', unit: 'ird' },
  icash: { address: 'i9PfCREb6gg1dUEs9L8WcaFew66ad7n6uu', unit: 'icash' },
  ixcoin: { address: 'xdZNeKxxfBMZ55Fz2S7z563ybFNYDN5mmq', unit: 'ixc' },
  judgecoin: { address: 'JQT571ebD3LKNu1khaUi1BCEoKtvczHPSA', unit: 'judge' },
  khcoin: { address: 'LR962Z92kwehU4iBpg9JRoZAwrBeAwQJPk', unit: 'khc' },
  kittehcoin: { address: 'KD8H5EFAdQG51mHvkR9LyRjp4LQp7bF3yZ', unit: 'meow' },
  lanacoin: { address: 'LR962Z92kwehU4iBpg9JRoZAwrBeAwQJPk', unit: 'lana' },
  latium: { address: 'AMh1Qqgq1S4o2EE2DBpLJfkWDEk4VpAZic', unit: 'lat' },
  'lbry credits': {
    address: 'bJeQTaAh2co7j6sPjCU6NSdHEWiYZ6q6WN',
    unit: 'lbry'
  },
  litecoin: { address: 'LR962Z92kwehU4iBpg9JRoZAwrBeAwQJPk', unit: 'LTC' },
  litedoge: { address: 'dKLRP7f8aX7VpGZprJ8go4zDP31G78PHNR', unit: 'ldoge' },
  lomocoin: { address: 'LR962Z92kwehU4iBpg9JRoZAwrBeAwQJPk', unit: 'lmc' },
  madbytecoin: { address: 'MDpHzmjcBJaT6vzMsWowQ46kCrhXc3tBii', unit: 'mbyt' },
  magicinternetmoney: {
    address: 'LR962Z92kwehU4iBpg9JRoZAwrBeAwQJPk',
    unit: 'mim'
  },
  magicoin: { address: '99gCTWnxstgAZvom8vpNrHw9KiyEJub1Y7', unit: 'xmg' },
  marscoin: { address: 'MDpHzmjcBJaT6vzMsWowQ46kCrhXc3tBii', unit: 'mars' },
  martexcoin: { address: 'MDpHzmjcBJaT6vzMsWowQ46kCrhXc3tBii', unit: 'mxt' },
  masterdoge: { address: 'Md9tyt2ttV3KvN8Stw9FtBNXqMxUNXZADD', unit: 'MDOGE' },
  mazacoin: { address: 'MDpHzmjcBJaT6vzMsWowQ46kCrhXc3tBii', unit: 'mzc' },
  megacoin: { address: 'MDpHzmjcBJaT6vzMsWowQ46kCrhXc3tBii', unit: 'mec' },
  mintcoin: { address: 'Md9tyt2ttV3KvN8Stw9FtBNXqMxUNXZADD', unit: 'mint' },
  mobiuscoin: { address: '16v8mLqCgHQeDG22eYA19nVQjdpN7D6zLT', unit: 'mobi' },
  monetaryunit: { address: '7YKnX5bp3ApfJCFR3FV6unqzohwTSC5UHe', unit: 'mu' },
  monocle: { address: 'MDpHzmjcBJaT6vzMsWowQ46kCrhXc3tBii', unit: 'mon' },
  mooncoin: { address: '2Jvwifj4opoGfZSHio9xcAJmd9bCC2ADXq', unit: 'moon' },
  myriadcoin: { address: 'MDpHzmjcBJaT6vzMsWowQ46kCrhXc3tBii', unit: 'xmy' },
  namecoin: { address: 'N2VVxzLBbfWCjoGXvMUaNJeKTsDR72MoB5', unit: 'NMC' },
  navcoin: { address: 'NRq6x6dUJqy5ZEQcwmotrRv76NUMj8vPoV', unit: 'nav' },
  needlecoin: { address: 'NRq6x6dUJqy5ZEQcwmotrRv76NUMj8vPoV', unit: 'ndc' },
  neetcoin: { address: 'NRq6x6dUJqy5ZEQcwmotrRv76NUMj8vPoV', unit: 'neet' },
  nyc: { address: 'RFCKqriVH7DDHGPE7i98FJpcVuGxjuMjig', unit: 'nyc' },
  neoscoin: { address: 'NRq6x6dUJqy5ZEQcwmotrRv76NUMj8vPoV', unit: 'neos' },
  nevacoin: { address: 'NRq6x6dUJqy5ZEQcwmotrRv76NUMj8vPoV', unit: 'neva' },
  novacoin: { address: '4KcxeDDWMj7ekj8iqtpZ2nfhmfsuko5LeQ', unit: 'nvc' },
  nubits: { address: 'BANDP4HQRnzYf6WCG2UyGvJ5UFFwqQvim6', unit: 'NBT' },
  nyancoin: { address: 'KD8H5EFAdQG51mHvkR9LyRjp4LQp7bF3yZ', unit: 'nyan' },
  ocupy: { address: 'oNnVzq7LL2hQG73zTnTevCnt7eSquPuxsR', unit: 'ocupy' },
  omnicoin: { address: 'oNnVzq7LL2hQG73zTnTevCnt7eSquPuxsR', unit: 'omc' },
  onyxcoin: { address: 'oNnVzq7LL2hQG73zTnTevCnt7eSquPuxsR', unit: 'onyx' },
  paccoin: { address: 'Am2cPwz7icXfqfN7Ec9eno2Hqk11AM5hTE', unit: 'pac' },
  particl: { address: 'PdquuRXLSPMi1Xpt22orJojTytFBtoBNpS', unit: 'part' },
  paycoin: { address: 'PEWJvKE3jCtqC6gnzcUXpgTgMNzFCEEWqC', unit: 'xpy' },
  pandacoin: { address: 'PEWJvKE3jCtqC6gnzcUXpgTgMNzFCEEWqC', unit: 'pnd' },
  parkbyte: { address: 'PEWJvKE3jCtqC6gnzcUXpgTgMNzFCEEWqC', unit: 'pkb' },
  peercoin: { address: 'UTu9ij6nxYvDpjVvK4og8JzuXwLWQg91Po', unit: 'PPC' },
  pesetacoin: { address: 'L1oV3Sqk3mBpeda6oFoywgHPKLvhTSuJrB', unit: 'ptc' },
  phcoin: { address: 'PEWJvKE3jCtqC6gnzcUXpgTgMNzFCEEWqC', unit: 'phc' },
  phoenixcoin: { address: 'PdquuRXLSPMi1Xpt22orJojTytFBtoBNpS', unit: 'pxc' },
  piggycoin: { address: 'paoJxA1CTa62iQUFY3TcNacF1ADfytJ68v', unit: 'piggy' },
  pinkcoin: { address: '2Jvwifj4opoGfZSHio9xcAJmd9bCC2ADXq', unit: 'pink' },
  pivx: { address: 'DB4EJbmqyhJvkGCdP89ZhYf1cmYfNeYtsr', unit: 'pivx' },
  potcoin: { address: 'PEWJvKE3jCtqC6gnzcUXpgTgMNzFCEEWqC', unit: 'pot' },
  primecoin: { address: 'AMh1Qqgq1S4o2EE2DBpLJfkWDEk4VpAZic', unit: 'xpm' },
  prospercoinclassic: {
    address: 'QSX7se7urkHTeQ744sUVH4H3Etm5J6drfp',
    unit: 'prc'
  },
  quark: { address: 'QSX7se7urkHTeQ744sUVH4H3Etm5J6drfp', unit: 'qrk' },
  qubitcoin: { address: 'GPm4BUA9f91wHjKKaUp7aYqJeocDADqzNU', unit: 'q2c' },
  reddcoin: { address: 'ReXvpy1mzHg66hXK98USjS6Q8QXuV4CaTs', unit: 'RDD' },
  riecoin: { address: 'RFCKqriVH7DDHGPE7i98FJpcVuGxjuMjig', unit: 'ric' },
  rimbit: { address: 'RFCKqriVH7DDHGPE7i98FJpcVuGxjuMjig', unit: 'rbt' },
  roicoin: { address: 'RFCKqriVH7DDHGPE7i98FJpcVuGxjuMjig', unit: 'roi' },
  rubycoin: { address: 'RFCKqriVH7DDHGPE7i98FJpcVuGxjuMjig', unit: 'rby' },
  rupaya: { address: 'RFCKqriVH7DDHGPE7i98FJpcVuGxjuMjig', unit: 'rupx' },
  sambacoin: { address: 'S3sXp5K4hU8xv8fQAYomDZNBkunrDRdyNf', unit: 'smb' },
  seckcoin: { address: 'STD8oBcMQebqjZoVBy95hgdyPR3nvG8Wvu', unit: 'skc' },
  sibcoin: { address: 'STD8oBcMQebqjZoVBy95hgdyPR3nvG8Wvu', unit: 'sib' },
  sixeleven: { address: 'N2VVxzLBbfWCjoGXvMUaNJeKTsDR72MoB5', unit: '611' },
  smileycoin: { address: 'BANDP4HQRnzYf6WCG2UyGvJ5UFFwqQvim6', unit: 'smly' },
  songcoin: { address: 'STD8oBcMQebqjZoVBy95hgdyPR3nvG8Wvu', unit: 'song' },
  spreadcoin: { address: 'STD8oBcMQebqjZoVBy95hgdyPR3nvG8Wvu', unit: 'spr' },
  stealthcoin: { address: 'S3sXp5K4hU8xv8fQAYomDZNBkunrDRdyNf', unit: 'xst' },
  stratis: { address: 'STD8oBcMQebqjZoVBy95hgdyPR3nvG8Wvu', unit: 'strat' },
  swagbucks: { address: 'STD8oBcMQebqjZoVBy95hgdyPR3nvG8Wvu', unit: 'bucks' },
  syscoin: { address: '16v8mLqCgHQeDG22eYA19nVQjdpN7D6zLT', unit: 'sys' },
  tajcoin: { address: 'TFtLmQCvq1XbNS5fEooifwBYeRZgJu9M8W', unit: 'taj' },
  terracoin: { address: '16v8mLqCgHQeDG22eYA19nVQjdpN7D6zLT', unit: 'trc' },
  titcoin: { address: '16v8mLqCgHQeDG22eYA19nVQjdpN7D6zLT', unit: 'tit' },
  tittiecoin: { address: 'TFtLmQCvq1XbNS5fEooifwBYeRZgJu9M8W', unit: 'ttc' },
  topcoin: { address: 'TfDwkWWDYBzUBsDkGE93A4TLGvpd1SL5Pn', unit: 'top' },
  transfercoin: { address: 'TfDwkWWDYBzUBsDkGE93A4TLGvpd1SL5Pn', unit: 'tx' },
  trezarcoin: { address: 'TfDwkWWDYBzUBsDkGE93A4TLGvpd1SL5Pn', unit: 'tzc' },
  unobtanium: { address: 'uQrYmTaeyjeYXc9Hq5TSC5sgZDJzZtFTiX', unit: 'uno' },
  usde: { address: 'GPm4BUA9f91wHjKKaUp7aYqJeocDADqzNU', unit: 'usde' },
  vcash: { address: 'Vfuxg3zf66JrH2vBPKodagpGRT7LXc6PSf', unit: 'xvc' },
  versioncoin: { address: 'VGaMgwhNNuqyTbn6MuUK6ZYUnwrPugQzeq', unit: 'v' },
  vergecoin: { address: 'DB4EJbmqyhJvkGCdP89ZhYf1cmYfNeYtsr', unit: 'xvg' },
  vertcoin: { address: 'Vfuxg3zf66JrH2vBPKodagpGRT7LXc6PSf', unit: 'VTC' },
  viacoin: { address: 'Vfuxg3zf66JrH2vBPKodagpGRT7LXc6PSf', unit: 'via' },
  vikingcoin: { address: 'VGaMgwhNNuqyTbn6MuUK6ZYUnwrPugQzeq', unit: 'vik' },
  w2coin: { address: 'WUbAeGbEWTEbuuCMSAUGYwMqgTdDxFVB9Q', unit: 'w2c' },
  wacoins: { address: 'WUbAeGbEWTEbuuCMSAUGYwMqgTdDxFVB9Q', unit: 'wac' },
  wankcoin: { address: '16v8mLqCgHQeDG22eYA19nVQjdpN7D6zLT', unit: 'wkc' },
  wearesatoshicoin: {
    address: 'wRYZh156XdxvcmqixB82ciEchjbi5U4Wqc',
    unit: 'wsx'
  },
  worldcoin: { address: 'WUbAeGbEWTEbuuCMSAUGYwMqgTdDxFVB9Q', unit: 'wdc' },
  xp: { address: 'XHGNcVBovpAMYmUXV18uXBuQwU97QEAAhd', unit: 'xp' },
  yenten: { address: 'YVHBZp5g4MYz14tnZG8ryZimpyuwbGjQHo', unit: 'ytn' },
  zcash: { address: '2H977wKgDKUfrh1fy9jSeNraAYTDvrTc7BV', unit: 'ZEC' },
  zetacoin: { address: 'ZHxPY2gFUiUjdwAxc6oVwpGM5zRpw395P2', unit: 'zet' },
  'testnet bitcoin': {
    address: 'mmS64PvBVJqtzNVeN78NyhhjbdR4zN1N13',
    unit: 'btc'
  },
  'testnet dogecoin': {
    address: 'na7J2cWkufmedEmpQwo1wxFJrdvxRmt9X2',
    unit: 'doge'
  },
  'testnet monetaryunit': {
    address: 'GPm4BUA9f91wHjKKaUp7aYqJeocDADqzNU',
    unit: 'mu'
  },
  'testnet pivx': {
    address: 'y2tydSGFNMpRtWQ53rTJZDKmDkdUuxofoz',
    unit: 'pivx'
  },
  'testnet wacoins': {
    address: 'ZhHzX8yYBtwcTNK3dX8pRwY8iVgmhAgDR6',
    unit: 'wac'
  }
};
var keysMock = {
  '2give': {
    wif: 'RpjutqEW9UjiLVr6dvQ51DUNBYWvnwtD1cBtrvNaGzAhTQk2BQhQ',
    unit: '2give'
  },
  '42coin': {
    wif: 'MEmNAq4ciiLT8TSHVaAPKpYGU5HhuyUfxusrWqde49odj9anwntB',
    unit: '42'
  },
  acoin: {
    wif: 'b9GduzwBBATNj6gVUhGLABS3rvB2PJy1GSS77YCYD8eYCGMwoDe3',
    unit: 'acoin'
  },
  agacoin: {
    wif: 'YLFf3w65rF3mDGRtyFmN2sdo8fMdXMpCB3bdUucjt3L1qyZ62EUV',
    unit: 'aga'
  },
  alphacoin: {
    wif: 'YBg2UmjBg68dEkR8RBNUEhYJtE9ygwYU1byVvTGePZaJZeME2md1',
    unit: 'alf'
  },
  alqo: {
    wif: 'VfpJm2bthUZHfxC51tfHhjw2eqjtVpw7F6PHQjP33RmCn1wR9usn',
    unit: 'alqo'
  },
  animecoin: {
    wif: 'PTTpkFU7M25WkDdoni5nGRxaCbJVSFYaQYDoueq4RL7Jx7a5Phyz',
    unit: 'ani'
  },
  anoncoin: {
    wif: 'PTTpkFU7M25WkDdoni5nGRxaCbJVSFYaQYDoueq4RL7Jx7a5Phyz',
    unit: 'anc'
  },
  apexcoin: {
    wif: 'PTTpkFU7M25WkDdoni5nGRxaCbJVSFYaQYDoueq4RL7Jx7a5Phyz',
    unit: 'apex'
  },
  auroracoin: {
    wif: 'PTTpkFU7M25WkDdoni5nGRxaCbJVSFYaQYDoueq4RL7Jx7a5Phyz',
    unit: 'aur'
  },
  aquariuscoin: {
    wif: 'PTTpkFU7M25WkDdoni5nGRxaCbJVSFYaQYDoueq4RL7Jx7a5Phyz',
    unit: 'arco'
  },
  axe: {
    wif: 'X9ccUeCtT1ifR8KkYecDfUsu9BkQr1eNsWcb1GqyxDJKbKtv4Gry',
    unit: 'axe'
  },
  bbqcoin: {
    wif: 'YdQvCFotCYt3AJTS5QZ9dDpmdXkwCCMeVvqtbpJvrzqSQdvauh3M',
    unit: 'bqc'
  },
  biblepay: {
    wif: 'U3SNUFdzmnUmxG3cw4KTwptfv4XiKDx7TEXrFjZzeAUNgNmQxFpZ',
    unit: 'bbp'
  },
  bitcoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'BTC'
  },
  bitcoincash: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'bch'
  },
  bitcoindark: {
    wif: 'Uvv9uDoPphyboN8EFWgpisTbQfjdKjaURtGdcTeZb2zeNMxLGQCp',
    unit: 'btcd'
  },
  bitcoingold: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'btg'
  },
  birdcoin: {
    wif: 'T1NxU87hYi4p8dxF4XZDNcEGB289UJ42K9AwLZ9LCpCPi4LfKLXT',
    unit: 'brd'
  },
  bitsynq: {
    wif: 'VNf3cht6MAj1ivAXujsW7Pk49yLapzPevD92Hpgr4UFnDMVzqcxs',
    unit: 'synq'
  },
  bitzeny: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'zny'
  },
  blackcoin: {
    wif: 'Pkd5taBuhKunhFfLtrsZrn9YhTho7662jRU52ZXFQHcjWmxumJpk',
    unit: 'BLK'
  },
  blackjack: {
    wif: 'PAJZbvkJziFEoBcGgZHzg5mbhiuBmR185eyYnk8sSNbtPTD38shq',
    unit: 'jack'
  },
  blocknet: {
    wif: 'PuCiTjYosUpvfmg7SwGTexF2wtuSwWMkts6Cb1sLtmNSo7EYYSrn',
    unit: 'block'
  },
  bolivarcoin: {
    wif: 'YdQvCFotCYt3AJTS5QZ9dDpmdXkwCCMeVvqtbpJvrzqSQdvauh3M',
    unit: 'boli'
  },
  boxycoin: {
    wif: 'X9ccUeCtT1ifR8KkYecDfUsu9BkQr1eNsWcb1GqyxDJKbKtv4Gry',
    unit: 'boxy'
  },
  bunnycoin: {
    wif: 'PuCiTjYosUpvfmg7SwGTexF2wtuSwWMkts6Cb1sLtmNSo7EYYSrn',
    unit: 'bun'
  },
  cagecoin: {
    wif: 'Qe6sKYMJkFQcYMjxDKEvdpiUC4ui7biPi5CrPHbpMA91CmB5A6Sw',
    unit: 'cage'
  },
  campuscoin: {
    wif: 'QCMyc4GcDnfCcoheZ64FFJS1SmJkcLuDDkLThvZXsissMmYrR9gx',
    unit: 'cmpco'
  },
  canadaecoin: {
    wif: 'QCMyc4GcDnfCcoheZ64FFJS1SmJkcLuDDkLThvZXsissMmYrR9gx',
    unit: 'cdn'
  },
  cannabiscoin: {
    wif: 'QCMyc4GcDnfCcoheZ64FFJS1SmJkcLuDDkLThvZXsissMmYrR9gx',
    unit: 'cann'
  },
  capricoin: {
    wif: 'QCMyc4GcDnfCcoheZ64FFJS1SmJkcLuDDkLThvZXsissMmYrR9gx',
    unit: 'cpc'
  },
  cassubiandetk: {
    wif: 'QVXEkNzQa6VUZqjBfEr2qecywdi4HBSfYdaipqFirgPHvS36EV8N',
    unit: 'cdt'
  },
  cashcoin: {
    wif: 'R5qm32S1GiA2TunFsYRc2LzvwNWfcrXaCQ5F4ee6pbQ93koE2U31',
    unit: 'cash'
  },
  catcoin: {
    wif: 'PAJZbvkJziFEoBcGgZHzg5mbhiuBmR185eyYnk8sSNbtPTD38shq',
    unit: 'cat'
  },
  chaincoin: {
    wif: 'QCMyc4GcDnfCcoheZ64FFJS1SmJkcLuDDkLThvZXsissMmYrR9gx',
    unit: 'chc'
  },
  colossuscoinxt: {
    wif: 'YUqHd6Sz2PxuBnSfXLAFq3jHP6ZHMn5vLVDm3MxqNX5j8JnHj25G',
    unit: 'colx'
  },
  condensate: {
    wif: 'Uvv9uDoPphyboN8EFWgpisTbQfjdKjaURtGdcTeZb2zeNMxLGQCp',
    unit: 'rain'
  },
  copico: {
    wif: 'NRQQk7wp7wfYvbYRvBKXhDJATYtvbKeVGSrtzUQPyyqKyoEtFphF',
    unit: 'xcpo'
  },
  coppercoin: {
    wif: 'QCMyc4GcDnfCcoheZ64FFJS1SmJkcLuDDkLThvZXsissMmYrR9gx',
    unit: 'copper'
  },
  corgicoin: {
    wif: 'QCMyc4GcDnfCcoheZ64FFJS1SmJkcLuDDkLThvZXsissMmYrR9gx',
    unit: 'corg'
  },
  coval: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'coval'
  },
  cryptobullion: {
    wif: 'MgWFtK9KFB5s41Ub9oM4iLpjDNtfREHrTEkFCCfvXb4ma9CDaH38',
    unit: 'cbx'
  },
  cryptoclub: {
    wif: 'RERPcBnuSs5ASRo2RcpVpX6RBoiKTGoJMqhNd6zCK59rL5yjS1f2',
    unit: 'ccb'
  },
  cryptoescudo: {
    wif: 'QCMyc4GcDnfCcoheZ64FFJS1SmJkcLuDDkLThvZXsissMmYrR9gx',
    unit: 'cesc'
  },
  cryptonite: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'xcn'
  },
  cryptowisdomcoin: {
    wif: 'M6BjbfhiYZRK9wRWwVmVXeSnDe645ZCwoUFixPHYZg3vSpREiUwU',
    unit: 'cwis'
  },
  c2coin: {
    wif: 'QCMyc4GcDnfCcoheZ64FFJS1SmJkcLuDDkLThvZXsissMmYrR9gx',
    unit: 'c2'
  },
  dash: {
    wif: 'XJCF3oZndAdoPeLX6j17TeyPPcx4gRv72xEiZjC5Sh42sfBPaDsp',
    unit: 'DASH'
  },
  deafdollars: {
    wif: 'T9xb3HUbiryx79y1cbx7AnKkRTKoJiKkUao4u1VRhHx6zPWxGwg9',
    unit: 'deaf'
  },
  deeponion: {
    wif: 'Qe6sKYMJkFQcYMjxDKEvdpiUC4ui7biPi5CrPHbpMA91CmB5A6Sw',
    unit: 'onion'
  },
  'deutsche emark': {
    wif: 'Ttrju6H6bdZdyk2rNyva9eoBfdL4UogPHnuihHDu9gifQ3ZBiHXa',
    unit: 'dem'
  },
  devcoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'dvc'
  },
  digibyte: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'DGB'
  },
  digitalcoin: {
    wif: 'QVXEkNzQa6VUZqjBfEr2qecywdi4HBSfYdaipqFirgPHvS36EV8N',
    unit: 'dgc'
  },
  dimecoin: {
    wif: 'NGpnAxauwnkQx5XfN6vdu3CgD7hGkuNm71EmS24JVW5chTyg1tWs',
    unit: 'dime'
  },
  dnotes: {
    wif: 'Qe6sKYMJkFQcYMjxDKEvdpiUC4ui7biPi5CrPHbpMA91CmB5A6Sw',
    unit: 'note'
  },
  dogecoin: {
    wif: 'QVXEkNzQa6VUZqjBfEr2qecywdi4HBSfYdaipqFirgPHvS36EV8N',
    unit: 'DOGE'
  },
  dogecoindark: {
    wif: 'QVXEkNzQa6VUZqjBfEr2qecywdi4HBSfYdaipqFirgPHvS36EV8N',
    unit: 'xvg'
  },
  egulden: {
    wif: 'T9xb3HUbiryx79y1cbx7AnKkRTKoJiKkUao4u1VRhHx6zPWxGwg9',
    unit: 'efl'
  },
  ekrona: {
    wif: 'SiDhKoPuCQEYBbvhxNmRnG3Hg9iqoTWZzFvgDeT9Drgy9PwUiRba',
    unit: 'krn'
  },
  electra: {
    wif: 'QwG8Ts576ZEtVPmVKU2iEAuSgwK1nSFr2xT7WCJ1L7eRmRbRVsoN',
    unit: 'eca'
  },
  ember: {
    wif: '8Wu8zx5FfVYdKxJDw4DarrQP4i1c7zA9xvJePmqVpzzRWgV2Kefa',
    unit: 'emb'
  },
  emerald: {
    wif: 'R5qm32S1GiA2TunFsYRc2LzvwNWfcrXaCQ5F4ee6pbQ93koE2U31',
    unit: 'emd'
  },
  emercoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'emc'
  },
  energycoin: {
    wif: 'ZfULCPLBRdHzyvYowwKQCSVBNaAW38Fje2CoWzjbJM7RNxKGHxNJ',
    unit: 'enrg'
  },
  espers: {
    wif: 'NRQQk7wp7wfYvbYRvBKXhDJATYtvbKeVGSrtzUQPyyqKyoEtFphF',
    unit: 'esp'
  },
  fastcoin: {
    wif: 'aFnrV2mn8ExYszbtAEtyP8s8NJy7NoLeHnhKkp7yGG8GWH7HZMyY',
    unit: 'fst'
  },
  feathercoin: {
    wif: 'N8F9boE1mdqGyZWtp2Xk6s7BxgVcvV72wZcdsZiD12KuR8qhw383',
    unit: 'ftc'
  },
  fedoracoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'tips'
  },
  fibre: {
    wif: 'RERPcBnuSs5ASRo2RcpVpX6RBoiKTGoJMqhNd6zCK59rL5yjS1f2',
    unit: 'fibre'
  },
  florincoin: {
    wif: 'T9xb3HUbiryx79y1cbx7AnKkRTKoJiKkUao4u1VRhHx6zPWxGwg9',
    unit: 'flo'
  },
  flurbo: {
    wif: '8DjsrdMTKBiMNvGgpuRoGWDQZqcJT9che34PGs9Jr3Uzx24sH8Eo',
    unit: 'flb'
  },
  fluttercoin: {
    wif: 'RERPcBnuSs5ASRo2RcpVpX6RBoiKTGoJMqhNd6zCK59rL5yjS1f2',
    unit: 'flt'
  },
  frazcoin: {
    wif: 'RERPcBnuSs5ASRo2RcpVpX6RBoiKTGoJMqhNd6zCK59rL5yjS1f2',
    unit: 'fraz'
  },
  freicoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'frc'
  },
  fudcoin: {
    wif: 'RERPcBnuSs5ASRo2RcpVpX6RBoiKTGoJMqhNd6zCK59rL5yjS1f2',
    unit: 'fud'
  },
  fuelcoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'fc2'
  },
  fujicoin: {
    wif: 'RP12BM9od1zJQwonyhDPchBuSEuyHh52XHKWBZLHoYuZcRCWFTUT',
    unit: 'fjc'
  },
  gabencoin: {
    wif: 'NRQQk7wp7wfYvbYRvBKXhDJATYtvbKeVGSrtzUQPyyqKyoEtFphF',
    unit: 'gbn'
  },
  garlicoin: {
    wif: 'T9xb3HUbiryx79y1cbx7AnKkRTKoJiKkUao4u1VRhHx6zPWxGwg9',
    unit: 'grlc'
  },
  globalboost: {
    wif: 'RgAHKfsbyKpaMyqL5r1BD3Nsw7KGxXcUrAZmJU2UnWQzB5ZrihNb',
    unit: 'bsty'
  },
  goodcoin: {
    wif: 'RgAHKfsbyKpaMyqL5r1BD3Nsw7KGxXcUrAZmJU2UnWQzB5ZrihNb',
    unit: 'good'
  },
  gridcoinresearch: {
    wif: 'VE5R3YXCB1oskQ9mMfUcKDeZuY8vza7vkmWtjNLkZzW4w2MhLvvy',
    unit: 'grc'
  },
  gulden: {
    wif: 'RgAHKfsbyKpaMyqL5r1BD3Nsw7KGxXcUrAZmJU2UnWQzB5ZrihNb',
    unit: 'nlg'
  },
  guncoin: {
    wif: 'RpjutqEW9UjiLVr6dvQ51DUNBYWvnwtD1cBtrvNaGzAhTQk2BQhQ',
    unit: 'gun'
  },
  hamradiocoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'ham'
  },
  hfrcoin: {
    wif: 'NRQQk7wp7wfYvbYRvBKXhDJATYtvbKeVGSrtzUQPyyqKyoEtFphF',
    unit: 'hfr'
  },
  hodlcoin: {
    wif: 'RyKYTzbQKderK1rsBznxoPZrRyiadN9wB3p2RNifmTvQjjybpjNs',
    unit: 'hodl'
  },
  htmlcoin: {
    wif: 'S7uB39xJVnZzHXsdk5BrbZfLgQvETnRfLVS9yq4mFwg825DbDdq9',
    unit: 'html'
  },
  hyperstake: {
    wif: 'dMy6VRLfoUCSLrt1mqBj6nrMbSBoub2ui4n4WMPxaJxDREHrZLeq',
    unit: 'hyp'
  },
  imperiumcoin: {
    wif: 'T9xb3HUbiryx79y1cbx7AnKkRTKoJiKkUao4u1VRhHx6zPWxGwg9',
    unit: 'mprm'
  },
  incakoin: {
    wif: 'Ttrju6H6bdZdyk2rNyva9eoBfdL4UogPHnuihHDu9gifQ3ZBiHXa',
    unit: 'nka'
  },
  incognitocoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'icg'
  },
  influxcoin: {
    wif: 'b9GduzwBBATNj6gVUhGLABS3rvB2PJy1GSS77YCYD8eYCGMwoDe3',
    unit: 'infx'
  },
  iridiumcoin: {
    wif: 'T9xb3HUbiryx79y1cbx7AnKkRTKoJiKkUao4u1VRhHx6zPWxGwg9',
    unit: 'ird'
  },
  icash: {
    wif: 'XJCF3oZndAdoPeLX6j17TeyPPcx4gRv72xEiZjC5Sh42sfBPaDsp',
    unit: 'icash'
  },
  ixcoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'ixc'
  },
  judgecoin: {
    wif: 'SR4SBUg6r6QGEZuArDyeBurKBHKY8cy7fNgR6jkxEuBYajYKfJ2M',
    unit: 'judge'
  },
  khcoin: {
    wif: 'T9xb3HUbiryx79y1cbx7AnKkRTKoJiKkUao4u1VRhHx6zPWxGwg9',
    unit: 'khc'
  },
  kittehcoin: {
    wif: 'SiDhKoPuCQEYBbvhxNmRnG3Hg9iqoTWZzFvgDeT9Drgy9PwUiRba',
    unit: 'meow'
  },
  lanacoin: {
    wif: 'T9xb3HUbiryx79y1cbx7AnKkRTKoJiKkUao4u1VRhHx6zPWxGwg9',
    unit: 'lana'
  },
  latium: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'lat'
  },
  'lbry credits': {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'lbry'
  },
  litecoin: {
    wif: 'T9xb3HUbiryx79y1cbx7AnKkRTKoJiKkUao4u1VRhHx6zPWxGwg9',
    unit: 'LTC'
  },
  litedoge: {
    wif: 'SR4SBUg6r6QGEZuArDyeBurKBHKY8cy7fNgR6jkxEuBYajYKfJ2M',
    unit: 'ldoge'
  },
  lomocoin: {
    wif: 'T9xb3HUbiryx79y1cbx7AnKkRTKoJiKkUao4u1VRhHx6zPWxGwg9',
    unit: 'lmc'
  },
  madbytecoin: {
    wif: 'HPgyJdhEAiWso16K7buAdJ5bzn4kD6RmjRgTy2dBHiD8QYUnfps7',
    unit: 'mbyt'
  },
  magicinternetmoney: {
    wif: 'T9xb3HUbiryx79y1cbx7AnKkRTKoJiKkUao4u1VRhHx6zPWxGwg9',
    unit: 'mim'
  },
  magicoin: {
    wif: 'P1iw2mPQpZL6pfbW8Uu6sug7THhXvzjPvDMREHnmwtrB77y7UHfY',
    unit: 'xmg'
  },
  marscoin: {
    wif: 'TT7rBcCQ5ApE4BzYikjtm8WivKj6yYsCoU3L1vBcgFTXZ3zcnU7b',
    unit: 'mars'
  },
  martexcoin: {
    wif: 'TT7rBcCQ5ApE4BzYikjtm8WivKj6yYsCoU3L1vBcgFTXZ3zcnU7b',
    unit: 'mxt'
  },
  masterdoge: {
    wif: 'MgWFtK9KFB5s41Ub9oM4iLpjDNtfREHrTEkFCCfvXb4ma9CDaH38',
    unit: 'MDOGE'
  },
  mazacoin: {
    wif: 'aFnrV2mn8ExYszbtAEtyP8s8NJy7NoLeHnhKkp7yGG8GWH7HZMyY',
    unit: 'mzc'
  },
  megacoin: {
    wif: 'TT7rBcCQ5ApE4BzYikjtm8WivKj6yYsCoU3L1vBcgFTXZ3zcnU7b',
    unit: 'mec'
  },
  mintcoin: {
    wif: 'TbhUkmZJFKjN2i1KGq8nZJcDAkvkoy8vxufTaNXiAjDEqPAG5cA5',
    unit: 'mint'
  },
  mobiuscoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'mobi'
  },
  monetaryunit: {
    wif: 'Kky4TDTcyBB5PHJbxpDTN5bPyjHBZnmQLVeYvJAh9NGWuqcjdp7T',
    unit: 'mu'
  },
  monocle: {
    wif: 'TT7rBcCQ5ApE4BzYikjtm8WivKj6yYsCoU3L1vBcgFTXZ3zcnU7b',
    unit: 'mon'
  },
  mooncoin: {
    wif: 'LVsDK2G7qwkmFsNSjCBvLx4qDuHSjt839hmCiZuAbm35KVfbTL5y',
    unit: 'moon'
  },
  myriadcoin: {
    wif: 'TT7rBcCQ5ApE4BzYikjtm8WivKj6yYsCoU3L1vBcgFTXZ3zcnU7b',
    unit: 'xmy'
  },
  namecoin: {
    wif: 'TkH7KvvCRUeW1E25puXgMUhhRC8QePQf8MHb8psofCxx7iKxArH3',
    unit: 'NMC'
  },
  navcoin: {
    wif: 'PJtCB67DAsANmhd3EdgtUFs5xA6qbqGrF6bgMCUxvrMbfnQZ8QW1',
    unit: 'nav'
  },
  needlecoin: {
    wif: 'Ttrju6H6bdZdyk2rNyva9eoBfdL4UogPHnuihHDu9gifQ3ZBiHXa',
    unit: 'ndc'
  },
  neetcoin: {
    wif: 'Ttrju6H6bdZdyk2rNyva9eoBfdL4UogPHnuihHDu9gifQ3ZBiHXa',
    unit: 'neet'
  },
  nyc: {
    wif: 'Uvv9uDoPphyboN8EFWgpisTbQfjdKjaURtGdcTeZb2zeNMxLGQCp',
    unit: 'nyc'
  },
  neoscoin: {
    wif: 'TJYDcSqVu1u65fynAgLzxxREftXT98bUe2RCTTqXBmhpGimPUs8Q',
    unit: 'neos'
  },
  nevacoin: {
    wif: 'TJYDcSqVu1u65fynAgLzxxREftXT98bUe2RCTTqXBmhpGimPUs8Q',
    unit: 'neva'
  },
  novacoin: {
    wif: 'MEmNAq4ciiLT8TSHVaAPKpYGU5HhuyUfxusrWqde49odj9anwntB',
    unit: 'nvc'
  },
  nubits: {
    wif: 'PJtCB67DAsANmhd3EdgtUFs5xA6qbqGrF6bgMCUxvrMbfnQZ8QW1',
    unit: 'NBT'
  },
  nyancoin: {
    wif: 'SiDhKoPuCQEYBbvhxNmRnG3Hg9iqoTWZzFvgDeT9Drgy9PwUiRba',
    unit: 'nyan'
  },
  ocupy: {
    wif: 'd4oqM6csTANAPprUfgPwWSfP6ZnWEkVTPBXoPShmbMSnrZwjcyBF',
    unit: 'ocupy'
  },
  omnicoin: {
    wif: 'd4oqM6csTANAPprUfgPwWSfP6ZnWEkVTPBXoPShmbMSnrZwjcyBF',
    unit: 'omc'
  },
  onyxcoin: {
    wif: 'd4oqM6csTANAPprUfgPwWSfP6ZnWEkVTPBXoPShmbMSnrZwjcyBF',
    unit: 'onyx'
  },
  paccoin: {
    wif: 'Pc3TKQq1XAzeijeaLnUg4c44T2W9GfpJZyqwU7B9uos2ESm2ffzt',
    unit: 'pac'
  },
  particl: {
    wif: 'H6XiAJyRpQgbqy4n1T7P2wtdVufSYFtKQYSCr7vzJkhhqt3uQPmo',
    unit: 'part'
  },
  paycoin: {
    wif: 'UC213QztwwPuvn4PV8iMjzzAAVjN9eDqcg9ypBv68eE5xhwsuSz6',
    unit: 'xpy'
  },
  pandacoin: {
    wif: 'UC213QztwwPuvn4PV8iMjzzAAVjN9eDqcg9ypBv68eE5xhwsuSz6',
    unit: 'pnd'
  },
  parkbyte: {
    wif: 'UC213QztwwPuvn4PV8iMjzzAAVjN9eDqcg9ypBv68eE5xhwsuSz6',
    unit: 'pkb'
  },
  peercoin: {
    wif: 'W7ZCUWgbDwJhbWENg7qy6GDVQ9Lr15kHjRFg66RKWs2Ld1bJVcpJ',
    unit: 'PPC'
  },
  pesetacoin: {
    wif: 'T1NxU87hYi4p8dxF4XZDNcEGB289UJ42K9AwLZ9LCpCPi4LfKLXT',
    unit: 'ptc'
  },
  phcoin: {
    wif: 'UC213QztwwPuvn4PV8iMjzzAAVjN9eDqcg9ypBv68eE5xhwsuSz6',
    unit: 'phc'
  },
  phoenixcoin: {
    wif: 'ULbdcaMo86K3uJ5A3D7FYB5eQvw1z4VZn7n7NeGBd7yoF38WpBXb',
    unit: 'pxc'
  },
  piggycoin: {
    wif: 'dWYj4ahZyd7aKNtnKuactxwqqsPTk1JdsWQC4ok44nhvhZUys4nk',
    unit: 'piggy'
  },
  pinkcoin: {
    wif: 'LVsDK2G7qwkmFsNSjCBvLx4qDuHSjt839hmCiZuAbm35KVfbTL5y',
    unit: 'pink'
  },
  pivx: {
    wif: 'YUqHd6Sz2PxuBnSfXLAFq3jHP6ZHMn5vLVDm3MxqNX5j8JnHj25G',
    unit: 'pivx'
  },
  potcoin: {
    wif: 'UC213QztwwPuvn4PV8iMjzzAAVjN9eDqcg9ypBv68eE5xhwsuSz6',
    unit: 'pot'
  },
  primecoin: {
    wif: 'PTTpkFU7M25WkDdoni5nGRxaCbJVSFYaQYDoueq4RL7Jx7a5Phyz',
    unit: 'xpm'
  },
  prospercoinclassic: {
    wif: 'Udktku5bUQ9KrL6h9Mu38XGcuoLKeu32712NVYxNc5VDohb9TPq1',
    unit: 'prc'
  },
  quark: {
    wif: 'Udktku5bUQ9KrL6h9Mu38XGcuoLKeu32712NVYxNc5VDohb9TPq1',
    unit: 'qrk'
  },
  qubitcoin: {
    wif: 'aFnrV2mn8ExYszbtAEtyP8s8NJy7NoLeHnhKkp7yGG8GWH7HZMyY',
    unit: 'q2c'
  },
  reddcoin: {
    wif: 'V5VnUPAHzrtjmt8zob5iX3Z5f6wHA9rCbKtmAuzf5WkMehDGVpf6',
    unit: 'RDD'
  },
  riecoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'ric'
  },
  rimbit: {
    wif: 'Uvv9uDoPphyboN8EFWgpisTbQfjdKjaURtGdcTeZb2zeNMxLGQCp',
    unit: 'rbt'
  },
  roicoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'roi'
  },
  rubycoin: {
    wif: 'Uvv9uDoPphyboN8EFWgpisTbQfjdKjaURtGdcTeZb2zeNMxLGQCp',
    unit: 'rby'
  },
  rupaya: {
    wif: 'Uvv9uDoPphyboN8EFWgpisTbQfjdKjaURtGdcTeZb2zeNMxLGQCp',
    unit: 'rupx'
  },
  sambacoin: {
    wif: 'VE5R3YXCB1oskQ9mMfUcKDeZuY8vza7vkmWtjNLkZzW4w2MhLvvy',
    unit: 'smb'
  },
  seckcoin: {
    wif: 'VNf3cht6MAj1ivAXujsW7Pk49yLapzPevD92Hpgr4UFnDMVzqcxs',
    unit: 'skc'
  },
  sibcoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'sib'
  },
  sixeleven: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: '611'
  },
  smileycoin: {
    wif: 'Pkd5taBuhKunhFfLtrsZrn9YhTho7662jRU52ZXFQHcjWmxumJpk',
    unit: 'smly'
  },
  songcoin: {
    wif: 'VNf3cht6MAj1ivAXujsW7Pk49yLapzPevD92Hpgr4UFnDMVzqcxs',
    unit: 'song'
  },
  spreadcoin: {
    wif: 'VNf3cht6MAj1ivAXujsW7Pk49yLapzPevD92Hpgr4UFnDMVzqcxs',
    unit: 'spr'
  },
  stealthcoin: {
    wif: 'VE5R3YXCB1oskQ9mMfUcKDeZuY8vza7vkmWtjNLkZzW4w2MhLvvy',
    unit: 'xst'
  },
  stratis: {
    wif: 'VNf3cht6MAj1ivAXujsW7Pk49yLapzPevD92Hpgr4UFnDMVzqcxs',
    unit: 'strat'
  },
  swagbucks: {
    wif: 'Pkd5taBuhKunhFfLtrsZrn9YhTho7662jRU52ZXFQHcjWmxumJpk',
    unit: 'bucks'
  },
  syscoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'sys'
  },
  tajcoin: {
    wif: 'HYGbso48LsS1mX75fgJ4RUB6FDGQ3WhVtsJbXUyGnBxqgscN7567',
    unit: 'taj'
  },
  terracoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'trc'
  },
  titcoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'tit'
  },
  tittiecoin: {
    wif: 'VfpJm2bthUZHfxC51tfHhjw2eqjtVpw7F6PHQjP33RmCn1wR9usn',
    unit: 'ttc'
  },
  topcoin: {
    wif: 'VpPwLBxnsdUReUCqZy4BVv2WuGwYLFCqQY1QyBj8XuWv4M7MBaHv',
    unit: 'top'
  },
  transfercoin: {
    wif: 'Pkd5taBuhKunhFfLtrsZrn9YhTho7662jRU52ZXFQHcjWmxumJpk',
    unit: 'tx'
  },
  trezarcoin: {
    wif: 'VpPwLBxnsdUReUCqZy4BVv2WuGwYLFCqQY1QyBj8XuWv4M7MBaHv',
    unit: 'tzc'
  },
  unobtanium: {
    wif: 'aFnrV2mn8ExYszbtAEtyP8s8NJy7NoLeHnhKkp7yGG8GWH7HZMyY',
    unit: 'uno'
  },
  usde: {
    wif: 'RgAHKfsbyKpaMyqL5r1BD3Nsw7KGxXcUrAZmJU2UnWQzB5ZrihNb',
    unit: 'usde'
  },
  vcash: {
    wif: 'WZJ6BzmHkQ47X4GgLM2eUnVx9SwoWLZUDk84mTTbzJHUU19xCNwm',
    unit: 'xvc'
  },
  versioncoin: {
    wif: 'WQiTcqQPaF8yYYFunGdkgcQTu1k9fvHk4JVwD17WVpXmBfxwy5YD',
    unit: 'v'
  },
  vergecoin: {
    wif: 'QVXEkNzQa6VUZqjBfEr2qecywdi4HBSfYdaipqFirgPHvS36EV8N',
    unit: 'xvg'
  },
  vertcoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'VTC'
  },
  viacoin: {
    wif: 'WZJ6BzmHkQ47X4GgLM2eUnVx9SwoWLZUDk84mTTbzJHUU19xCNwm',
    unit: 'via'
  },
  vikingcoin: {
    wif: 'Dqmqam3dy2XaQamsqnRjX7ov2MF6B3vKppjLY8JuWE83ebehucMw',
    unit: 'vik'
  },
  w2coin: {
    wif: 'WrTMLKV66htPU6JDSVpS58gveKM7BB6vYdNKtN9nyFnu2fb5KPCC',
    unit: 'w2c'
  },
  wacoins: {
    wif: 'WrTMLKV66htPU6JDSVpS58gveKM7BB6vYdNKtN9nyFnu2fb5KPCC',
    unit: 'wac'
  },
  wankcoin: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'wkc'
  },
  wearesatoshicoin: {
    wif: 'PTTpkFU7M25WkDdoni5nGRxaCbJVSFYaQYDoueq4RL7Jx7a5Phyz',
    unit: 'wsx'
  },
  worldcoin: {
    wif: 'WrTMLKV66htPU6JDSVpS58gveKM7BB6vYdNKtN9nyFnu2fb5KPCC',
    unit: 'wdc'
  },
  xp: {
    wif: 'X9ccUeCtT1ifR8KkYecDfUsu9BkQr1eNsWcb1GqyxDJKbKtv4Gry',
    unit: 'xp'
  },
  yenten: {
    wif: 'KKEAjjNvSiRfTjGJJb2myZJwERgE4XxDrAnAEw8Qfw1P4qzEqLUx',
    unit: 'ytn'
  },
  zcash: {
    wif: 'L48KbYBRKV1MLKL94y1ExRnNUbgVEdJrfNtp3Crt8KmwUW2fwHok',
    unit: 'ZEC'
  },
  zetacoin: {
    wif: 'aFnrV2mn8ExYszbtAEtyP8s8NJy7NoLeHnhKkp7yGG8GWH7HZMyY',
    unit: 'zet'
  },
  'testnet bitcoin': {
    wif: 'cUVK4TBGkYhcVkoQTNpNKkHS6pytu5QYjR3H9dKPdSRwjF6WRhDW',
    unit: 'btc'
  },
  'testnet dogecoin': {
    wif: 'cmeaCmu56rXtSnpwZXc9v6UQbhPCZux14JHYGY1acPwNHuWoR578',
    unit: 'doge'
  },
  'testnet monetaryunit': {
    wif: 'Ab1y1D7r7eNYyCUyg7k61HjCYnpjoqxLF72UE8gphhYPTKLuRtdW',
    unit: 'mu'
  },
  'testnet pivx': {
    wif: 'cUVK4TBGkYhcVkoQTNpNKkHS6pytu5QYjR3H9dKPdSRwjF6WRhDW',
    unit: 'pivx'
  },
  'testnet wacoins': {
    wif: 'Y36PucNHVwDVGEQMs6yaSXSpdnxKrXGjrAMNMzvYu5pbHKADHx7b',
    unit: 'wac'
  }
};