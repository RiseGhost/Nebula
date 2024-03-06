const path = require('path');

module.exports = {
    entry: './src/aes.js', // Caminho para o ponto de entrada do seu aplicativo JavaScript
    output: {
        path: path.resolve(__dirname, './public/script'),
        filename: 'aes.js' // Nome do arquivo de saída
    },
    mode: 'development', // Define o modo de construção para desenvolvimento
};
