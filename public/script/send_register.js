/*
Ficheiro responsável por fazer enviar os dados do formulário para o servidor.
E se connectar ao WebSocket que irá informar quando o porcesso se encontrar finalizado.
*/

document.getElementById("res_form").addEventListener('submit', (e) => {
    e.preventDefault()
    const json_data = JSON.stringify({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    })
    fetch('/r', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json_data
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