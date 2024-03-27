const CryptoJS = require('crypto-js');

// Chave secreta (deve ter 16, 24 ou 32 bytes para AES)
//const chaveSecreta = 'abcdefghijklmnopqrstuvxyz123456'; // Exemplo de chave de 32 bytes


function aes_cipher(str, key) {
  return CryptoJS.AES.encrypt(str, key).toString()
}

function aes_decipher(str, key) {
  return CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8)
}

module.exports = {aes_cipher, aes_decipher}

/*
const randonNumber = BigNumber(parseInt(Math.random()) * 20) + 10
const i = BigNumber(502013)
const p = BigNumber(25195908475657893494027183240048398571429282126204032027777137836043662020707595556264018525880784406918290641249515082189298559149176184502808489120072844992687392807287776735971418347270261896375014971824691165077613379859095700097330459748808428401797429100642458691817195118746121515172654632282216869987549182422433637259085141865462043576798423387184774447920739934236584823824281198163815010674810451660377306056201619676256133844143603833904414952634432190114657544454178424020924616515723350778707749817125772467962926386356373289912154831438167899885040445364023527381951378636564391212010397122822120720357)
const public_key = i.pow(randonNumber).mod(p)
const queryString = new URLSearchParams({ cliente_public_key: public_key }).toString();
fetch('/key?' + queryString, {
  method: 'GET'
}).then(PublicKey => PublicKey.json()).then(pk => {
  const public_key_server = BigNumber(pk.public_key)
  const private_key = public_key_server.pow(randonNumber).mod(p).toString(16).substring(0, 32)
  console.log("private key -> " + private_key)
  console.log(aes_cipher("Hello World!!!", private_key))
  document.cookie = "Private Key =" + private_key
})
*/

//const cipher = aes_cipher("Hello World!!!", chaveSecreta)
//const decipher = aes_decipher(cipher, chaveSecreta)
//
//console.log(cipher)
//console.log(decipher)

