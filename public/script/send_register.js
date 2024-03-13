/*
Ficheiro responsável por fazer enviar os dados do formulário para o servidor.
E se connectar ao WebSocket que irá informar quando o porcesso se encontrar finalizado.
*/

document.getElementById("res_form").addEventListener('submit', (e) => {
    e.preventDefault()
    var formData = new FormData(document.getElementById("res_form"))
    fetch('/r', {
        method: 'POST',
        body: formData
    }).then((response) => response.json()).then(data => {
        console.log(data)
        console.log(data.port_user)
        try{
            document.getElementById("loding").style.visibility = "visible"
            const socket = new WebSocket("ws://89.114.85.241:" + data.port_user)
            socket.onopen = () => { console.log("Connectado com sucesso") }
            socket.onmessage = (msg) => {
                document.getElementById("status").innerHTML = msg.data
            }
        }   catch(e){
            alert("Erro to create user. Please try again.")
        }
    })
})