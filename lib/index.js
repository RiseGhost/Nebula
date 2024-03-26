const storage = require('./build/Release/storagem')

module.exports = {
    DirInfo: storage.StorageInfo,
    RenameFile: storage.RenameFile
}