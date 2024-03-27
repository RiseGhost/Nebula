const path = require('path');

module.exports = {
    entry: {
        key: "./src/key.js",
        gui: "./src/gui.js"
    },
    output: {
        path: path.resolve(__dirname, './public/script'),
        filename: '[name].js' // Nome do arquivo de saída
    },
    mode: 'none',
};