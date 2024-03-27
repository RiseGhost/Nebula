const CryptoJS = require('crypto-js');

// Chave secreta (deve ter 16, 24 ou 32 bytes para AES)
const chaveSecreta = 'abcdefghijklmnopqrstuvxyz123456'; // Exemplo de chave de 32 bytes


function aes_cipher(str, key) {
  return CryptoJS.AES.encrypt(str, key).toString()
}

function aes_decipher(str, key) {
  return CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8)
}

/*
const input = JSON.stringify({
  name: "John",
  idade: 98
})

const cipher = aes_cipher(input, chaveSecreta)
const decipher = aes_decipher(cipher, chaveSecreta)

console.log(cipher)
console.log(decipher)

*/
module.exports = {aes_cipher, aes_decipher}

