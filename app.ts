require('dotenv').config()
const express = require('express')
const seccions = require('express-session')
const BodyParse = require('body-parser')
const port = process.env.PORT
const app = express()
const multer = require('multer');
const upload = multer();

function CreateUser(req,res,next){
  console.log("CreateUser")
  const {email, password} = req.body
  console.log(email,password)
  next()
}

app.use(seccions({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))
app.use(upload.none())
app.use(express.static('public'))
app.use(BodyParse.urlencoded({extended:false}))
app.use(BodyParse.json())

app.get('/', function (req, res) {
  console.log(req.session)
  res.sendFile('./views/index.html', {root: __dirname})
})

app.get('/resgister', (req,res) => {
  res.sendFile('./views/resgister.html', {root: __dirname})
})

app.post('/r', CreateUser, (req,res) => {
  const {email, password} = req.body
  //console.log(email,password)
  res.sendStatus(200)
})

app.post('/login', function (req,res) {
  const {username,password} = req.body
  req.session.user = username
  console.log(username,password)
  res.send("Sucesso")
})

app.listen(port,() => {console.log('Server ON on port ' + port)})