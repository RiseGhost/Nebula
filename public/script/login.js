document.getElementById("res_form").addEventListener('submit', (e) => {
    e.preventDefault()
    const json_data = JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    })
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json_data
    }).then(response => response.json()).then(data => {
        if (data.status == "Sucess") window.location.href = "/desktop"
        else console.log(data.status)
    })
})