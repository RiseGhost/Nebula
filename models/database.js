const Sequelize = require('sequelize')
const sequelize = new Sequelize("nebula","root","25789", {
    host:       'localhost',
    dialect:    'mysql',
    port:       3306,
})

sequelize.authenticate().then((function(){
    console.log("Conectado com sucesso")
})).catch((function(erro){
    console.log("Erro na conexão: " + erro)
}))

module.exports = {sequelize, Sequelize}