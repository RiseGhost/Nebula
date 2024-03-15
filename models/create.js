const {User} = require('./user')

async function CreateUser(req, res, next) {
    const lastindex = await User.count()
    console.log("CreateUser")
    const { name, email, password } = req.body
    console.log(name, email, password)
    if (name != "" && email != "" && password != "") {
        User.create({
            name: name,
            password: password,
            email: email,
            private_key: "aaaaaaaaaaaaaaaaaaaaaaaaaa",
            dir_server: "./" + (lastindex + 1)
        })
        req.validat = true
        req.id = (lastindex + 1)
    }
    else {
        req.validat = false
    }
    next()
}

module.exports = CreateUser