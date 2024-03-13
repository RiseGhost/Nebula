const WebSocket = require('ws')
const { exec } = require('child_process')
const args = process.argv.slice(2)
const port = args[0]
const user_id = args[1]

const command = "sudo ./services/InitUserEnv.sh " + user_id

const child = exec(command, (error, stdout, stderr) => {
    if (error) console.log(error)
    if (stderr) console.log(stderr)
    console.log(stdout)
    console.log("Criando ficheiros.....")
    finish = true
})

const ws = new WebSocket.Server({ port: port })

ws.on('connection', (ws) => {
    ws.send("Creating enveroment")
    child.on('exit', (code,signal) => {
        ws.send("Envoroment finished.")
        ws.close()
    })
})
