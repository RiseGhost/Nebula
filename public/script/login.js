document.getElementById("res_form").addEventListener('submit', (e) => {
    e.preventDefault()
    var formData = new FormData(document.getElementById("res_form"))
    fetch('/login', {
        method: 'POST',
        body: formData
    }).then(response => response.json()).then(data => {console.log(data.status)})
})