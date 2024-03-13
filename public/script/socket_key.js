const SecretNumber = BigNumber(parseInt(Math.random()*20)+10)

const i = BigNumber(502013)
var p = BigNumber(25195908475657893494027183240048398571429282126204032027777137836043662020707595556264018525880784406918290641249515082189298559149176184502808489120072844992687392807287776735971418347270261896375014971824691165077613379859095700097330459748808428401797429100642458691817195118746121515172654632282216869987549182422433637259085141865462043576798423387184774447920739934236584823824281198163815010674810451660377306056201619676256133844143603833904414952634432190114657544454178424020924616515723350778707749817125772467962926386356373289912154831438167899885040445364023527381951378636564391212010397122822120720357)

const socket = new WebSocket("ws://89.114.85.241:8086")
socket.onopen = () => {
    console.log("Server Connect!")
    var number = i.pow(SecretNumber)
    number = number.mod(p)
    socket.send(number.toString())
    console.log("Public key send")
}
    
socket.onmessage = (resquest) => {
    var number = BigNumber(resquest.data)
    number = number.pow(SecretNumber)
    number = number.mod(p)
    console.log("Private key -> " + number.toString(16).substring(0,64))
    socket.close()

    const privateKey = number.toString(16).substring(0, 64) // Use apenas os primeiros 64 bytes da chave privada
}