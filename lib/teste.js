const storage = require('./build/Release/storagem')

const start = Date.now()
const s = storage.StorageInfo("/home/theo-pi/Desktop/Nebula")
const end = Date.now()

console.log(s)
console.log(end - start)