const {sequelize, Sequelize} = require('./database')

const User = sequelize.define('User',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email : {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    private_key: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dir_server: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

//User.sync({force: true})