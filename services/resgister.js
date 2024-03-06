
function CreateUser(req,res,next){
    const {email, password} = req.body
    console.log(email,password)
}

module.exports = {CreateUser}