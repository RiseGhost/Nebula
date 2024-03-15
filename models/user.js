const { sequelize, Sequelize } = require('./database')

const User = sequelize.define('User', {
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
    email: {
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

async function CheckUser(email, password) {
    return await User.findAll({
        where: {
            email: email,
            password: password
        }
    }).then((user) => {
        if (user.length == 1) {
            return {
                id: user[0].dataValues.id,
                email: user[0].dataValues.email,
                name: user[0].dataValues.name
            }
        }
        else return false
    })
}

//User.sync({force: true})
module.exports = { User, CheckUser }