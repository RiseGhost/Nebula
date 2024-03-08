const User = require('./user')

function CreateUser(req,res,next){
    console.log("CreateUser")
    const {name,email,password} = req.body
    console.log(name,email,password)
    if (name != "" && email != "" && password != ""){
        User.create({
            name: name,
            password: password,
            email: email,
            private_key: "aaaaaaaaaaaaaaaaaaaaaaaaaa",
            dir_server: "./"
        })
        req.validat = true
    }
    else{
        req.validat = false
    }
    next()
}

module.exports = CreateUser