const Sequelize = require('sequelize')
const sequelize = new Sequelize("nebula", "theo", "25789", {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
})

sequelize.authenticate().then((function () {
    console.log("Conectado com sucesso")
})).catch((function (erro) {
    console.log("Erro na conexão: " + erro)
}))

module.exports = { sequelize, Sequelize }