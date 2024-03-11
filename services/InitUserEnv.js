const WebSocket = require('ws')
const { exec } = require('child_process')
const args = process.argv.slice(2)
const port = args[0]
const user_id = args[1]

const command = "sudo ./services/InitUserEnv.sh " + user_id
console.log("Comando -> " + command)

exec(command, (error, stdout, stderr) => {
    if (error) console.log(error)
    if (stderr) console.log(stderr)
    console.log(stdout)
    console.log("Criando ficheiros.....")
})

/*
const ws = new WebSocket.Server({port: port})

ws.on('connection', (ws) => {
    console.log("User ID -> " + user_id)
    exec("sudo ./InitUserEnv.sh " + user_id, (error, stdout, stderr) => {
        if (error) console.log(error)
        if (stderr) console.log(stderr)
        console.log(stdout)
        console.log("Criando ficheiros.....")
        ws.send("Criado com sucesso")
    })
})
*/
