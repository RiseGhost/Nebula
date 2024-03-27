require('dotenv').config()
const { exec } = require('child_process')
const express = require('express')
const seccions = require('express-session')
const BodyParse = require('body-parser')
const port = process.env.PORT
const app = express()
const getPort = require('./services/random_port')
//const multer = require('multer');
//const upload = multer();
const CreateUser = require('./models/create')
const { CheckUser } = require('./models/user')
const { DirInfo, RenameFile } = require('./lib/index')
const { default: BigNumber } = require('bignumber.js')

app.use(seccions({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))
//app.use(upload.none())
app.use(express.static('public'))
app.use(BodyParse.urlencoded({ extended: false }))
app.use(BodyParse.json())

app.get('/', (req, res) => {
  console.log(req.session)
  res.sendFile('./views/login.html', { root: __dirname })
})

app.get('/resgister', (req, res) => {
  res.sendFile('./views/resgister.html', { root: __dirname })
})

app.get('/key', (req, res) => {
  const { cliente_public_key } = req.query
  const randonNumber = BigNumber(parseInt(Math.random() * 20) + 10)
  const i = new BigNumber(502013)
  const p = new BigNumber(25195908475657893494027183240048398571429282126204032027777137836043662020707595556264018525880784406918290641249515082189298559149176184502808489120072844992687392807287776735971418347270261896375014971824691165077613379859095700097330459748808428401797429100642458691817195118746121515172654632282216869987549182422433637259085141865462043576798423387184774447920739934236584823824281198163815010674810451660377306056201619676256133844143603833904414952634432190114657544454178424020924616515723350778707749817125772467962926386356373289912154831438167899885040445364023527381951378636564391212010397122822120720357)
  const public_key = i.pow(randonNumber).mod(p)
  const secret_number = new BigNumber(cliente_public_key).pow(randonNumber).mod(p)
  const private_key = secret_number.toString(16).substring(0, 32)
  req.session.client_key = private_key
  res.json({ public_key: public_key })
})

app.post('/r', CreateUser, (req, res) => {
  if (req.validat) {
    const port_user = getPort()
    const command = "node ./services/InitUserEnv.js " + port_user + " " + req.id

    exec(command, (error, stdout, stderr) => {
      if (error) console.log(error)
      if (stderr) console.log(stderr)
      console.log(stdout)
    })

    res.json({
      port_user: port_user,
      status: "Create Sucess"
    })
  }
  else
    res.json({ status: "Erro create User" })
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  CheckUser(email, password).then((u) => {
    if (u == false) res.json({ status: "User not found" })
    else {
      req.session.user_id = u.id
      req.session.name = u.name
      req.session.email = u.email
      req.session.auth = true
      res.json({ status: "Sucess" })
    }
  })
})

app.get('/desktop', (req, res) => {
  console.log(req.session)
  if (!req.session.auth) res.sendStatus(401)
  res.sendFile("./views/desktop.html", { root: __dirname })
})

app.post('/dir', (req, res) => {
  const { path } = req.body
  const s = req.session
  if (s.auth) {
    var user_dir
    (path) ? user_dir = __dirname + "/users_dir/" + s.user_id + path : user_dir = __dirname + "/users_dir/" + s.user_id
    res.json(DirInfo(user_dir))
  }
  else
    res.json({ status: 401, msg: "This user not have Permissons" })
})

app.post('/renamefile', (req, res) => {
  const { path, name } = req.body
  const s = req.session
  if (s.auth) {
    const user_dir_oldname = __dirname + "/users_dir/" + s.user_id + path
    const user_dir_newname = __dirname + "/users_dir/" + s.user_id + name
    res.json({ msg: RenameFile(user_dir_oldname, user_dir_newname) })
  }
  else
    res.json({ status: 401, msg: "This user not have Permissons" })
})

app.listen(port, () => { console.log('Server ON on port ' + port) })