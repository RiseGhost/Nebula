require('dotenv').config()
const { exec } = require('child_process')
const express = require('express')
const seccions = require('express-session')
const BodyParse = require('body-parser')
const port = process.env.PORT
const app = express()
const getPort = require('./services/random_port')
const multer = require('multer');
const upload = multer();
const CreateUser = require('./models/create')
const { CheckUser } = require('./models/user')
const { DirInfo } = require('./lib/index')

app.use(seccions({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))
app.use(upload.none())
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

app.post('/r', CreateUser, (req, res) => {
  if (req.validat) {
    const port_user = getPort()
    const key_port = getPort()
    const command = "node ./services/InitUserEnv.js " + port_user + " " + req.id

    exec(command, (error, stdout, stderr) => {
      if (error) console.log(error)
      if (stderr) console.log(stderr)
      console.log(stdout)
    })

    res.json({
      port_user: port_user,
      key_port: key_port,
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

app.get('/desktop', (req,res) => {
  res.sendFile("./views/desktop.html", { root: __dirname})
})

app.post('/dir', (req, res) => {
  const s = req.session
  if (s.auth) {
    const user_dir = __dirname + "/users_dir/" + s.user_id
    res.json(DirInfo(user_dir))
  }
  else
    res.json({status: 401,msg: "This user not have Permissons"})
})

app.listen(port, () => { console.log('Server ON on port ' + port) })